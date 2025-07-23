import AccountRepository from "App/Repositories/User/AccountRepository";
import Hash from "@ioc:Adonis/Core/Hash";
import * as jwt from "jsonwebtoken";
import DefaultException from "App/Exceptions/DefaultException";
import moment from "moment";
import Base64 from "base-64";
import Env from "@ioc:Adonis/Core/Env";
import Mail from "@ioc:Adonis/Addons/Mail";
import Role from "App/Models/User/Role";
export default class AuthService {
  protected accountRepository = new AccountRepository();

  /**
   * Register a new user
   *
   * @param {any} userData - contains email, password, fullname, username, google_id, avatar
   * @param {any} request
   * @returns {Promise<Account>}
   * @throws {DefaultException}
   */
  public async register(userData: any, request: any) {
    try {
      const role = await Role.findBy("code", "USER");
      if (!role) {
        throw new DefaultException("Role not found", 500);
      }
      console.log(userData, "PASS 1");
      userData.role_id = role.id;
      console.log(userData.role_id, "PASS 2");
      userData.password = await Hash.make(userData.password);
      const user = await this.accountRepository.store({
        urole_id: userData.role_id,
        email: userData.email,
        password: userData.password,
        fullname: userData.fullname,
        username: userData.username,
        is_ban: false,
        is_verified: false,
        google_id: userData.google_id || "",
        avatar: userData.avatar,
        no_handphone: userData.no_handphone || "",
        gender: userData.gender,
      });

      const verifyToken = this.generateVerificationToken(user);
      await this.sendVerificationEmail(user.email, verifyToken, request, user.fullname);

      return user;
    } catch (error) {
      console.error("error", error);
      throw new DefaultException("Register Failed : " + error, 500);
    }
  }

  /**
   * Generate JWT token for email verification
   */
  private generateVerificationToken(user: any) {
    const tokenPayload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(
      tokenPayload,
      Env.get("JWT_EMAIL_VERIFICATION_SECRET"),
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
  /**
   * Send verification email to user
   */
  private async sendVerificationEmail(
    email: string,
    token: string,
    request: any,
    fullname: string
  ) {
    // Ambil base URL dari header "origin" atau gunakan fallback dari environment
    const baseUrl =
      request.header("origin") || Env.get("BASE_URL", "http://localhost:3333");

    const verificationUrl = `${baseUrl}/auth/verify-email?token=${token}`;

    try {
      await Mail.send((message) => {
        message
          .from(Env.get("SMTP_USERNAME"), "PIS Japan Career Support")
          .to(email)
          .subject("Verifikasi Email Anda - PIS JAPAN CAREER")
          .htmlView("emails/verify_email", { verificationUrl, fullname });
      });
      console.log("Email verification sent to:", email);
    } catch (error) {
      console.log("Error sending verification email:", error);
      throw new DefaultException("Gagal mengirim email verifikasi.", 500);
    }
  }

  /**
   * Verify user's email using the token
   */
  public async verifyEmail(token: string) {
    try {
      // Verify and decode token
      const payload = jwt.verify(
        token,
        Env.get("JWT_EMAIL_VERIFICATION_SECRET")
      ) as any;

      const user = await this.accountRepository.find(payload.id);

      if (!user) {
        throw new DefaultException("Pengguna tidak ditemukan.", 404);
      }

      if (user.is_verified) {
        throw new DefaultException(
          "Email Anda telah diverifikasi. Anda sekarang dapat mengakses PIS Japan Career.",
          400
        );
      }

      await this.accountRepository.update(user.id, { is_verified: true });

      return true;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new DefaultException("Token verifikasi telah kedaluwarsa.", 400);
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new DefaultException("Token verifikasi tidak valid.", 400);
      } else {
        throw error;
      }
    }
  }

  /**
   * Resend Verification Email
   */
  public async resendVerifyEmail(email: string, request: any) {
    try {
      const user = await this.accountRepository.findByEmail(email);
      if (!user) {
        throw new DefaultException("User not found", 404);
      }
      if (user.is_verified) {
        throw new DefaultException("Email sudah diverifikasi", 400);
      }

      // Generate ulang token verifikasi
      const verifyToken = await this.generateVerificationToken(user);

      // Kirim ulang email verifikasi
        await this.sendVerificationEmail(user.email, verifyToken, request, user.fullname);

      return true;
    } catch (error) {
      throw new DefaultException(
        "Gagal mengirim ulang email verifikasi: " + error.message,
        500
      );
    }
  }
  /**
   * Login user and generate tokens
   */
  public async login(credentials: any, auth: any, rememberMe: boolean) {
    try {
      const isEmail = this.isEmail(credentials.email);
      let user;

      if (isEmail) {
        user = await this.accountRepository.findByEmail(credentials.email);
      } else {
        user = await this.accountRepository.findByUsername(credentials.email);
      }

      if (!user || !(await Hash.verify(user.password, credentials.password))) {
        throw new DefaultException("Invalid Credentials !");
      }
      if (user.is_ban) {
        throw new DefaultException("User banned!");
      }
      if (!user.is_verified) {
        throw new DefaultException("Email belum diverifikasi!");
      }
      await user.load("role");
      return await this.generateToken(auth, user, rememberMe);
    } catch (error) {
      throw error;
    }
  }

  private isEmail(input: string): boolean {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailRegex.test(input);
  }
  /**
   * Forgot password functionality
   */
  public async forgotPassword(credential: string, request: any) {
    try {
      const user = await this.accountRepository.findByEmail(credential);
      if (!user) {
        throw new DefaultException("User not found");
      }

      const token = this.generateRestorePasswordToken(user);
      const restoreUrlWithToken = `${request.header(
        "origin"
      )}/reset-password?token=${token}`;

      await this.sendEmailRestorePassword(user.email, restoreUrlWithToken);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Restore password using the token
   */
  public async restorePassword(data: any) {
    try {
      const payload = jwt.verify(
        data.token,
        Env.get("JWT_RESTORE_PASSWORD_SECRET")
      ) as any;

      const user = await this.accountRepository.findByEmail(payload.email);
      if (!user) {
        throw new DefaultException("User not found");
      }

      await this.accountRepository.update(user.id, {
        password: await Hash.make(data.password),
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new DefaultException(
          "Token restore password telah kedaluwarsa.",
          400
        );
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new DefaultException("Token restore password tidak valid.", 400);
      } else {
        throw error;
      }
    }
  }

  public async generateToken(auth: any, user: any, rememberMe: boolean) {
    try {
      const expiresIn = rememberMe ? "7days" : "4hours";
      const token = await auth.use("api").generate(user, { expiresIn });
      const jwtToken = jwt.sign({ user }, "PeSgVkYp3s6v9y$B&E)H@McQfTjWnZq4", {
        expiresIn: rememberMe ? "7d" : "4h",
      });
      return { token: token.token, jwtToken };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate token for password restore
   */
  private generateRestorePasswordToken(user: any) {
    const tokenPayload = {
      email: user.email,
    };
    const token = jwt.sign(
      tokenPayload,
      Env.get("JWT_RESTORE_PASSWORD_SECRET"),
      {
        expiresIn: "30m", // 30 minutes
      }
    );
    return token;
  }

  public async decryptToken(token) {
    try {
      const encrypt = Base64.decode(token).split(";");
      const result = {
        expiresIn: encrypt[0],
        credential: encrypt[1],
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Send email for password restore
   */
  private async sendEmailRestorePassword(email: string, restoreUrl: string) {
    try {
      await Mail.send((message) => {
        message
          .from(Env.get("SMTP_USERNAME"), "Support")
          .to(email)
          .subject("Restore Password!")
          .htmlView("emails/restore_password", { restoreUrl });
      });
    } catch (error) {
      throw new DefaultException("Gagal mengirim email restore password.", 500);
    }
  }

  public checkExpirationToken(expiresIn) {
    return expiresIn > moment();
  }
}
