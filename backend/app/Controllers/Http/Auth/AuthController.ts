import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DefaultException from "App/Exceptions/DefaultException";
import AuthService from "App/Services/Auth/AuthService";
import AccountService from "App/Services/User/AccountService";
import CreateAccountValidator from "App/Validators/User/CreateAccountValidator";
import ResendVerifyEmailValidator from "App/Validators/User/ResendEmailValidator";

export default class AuthController {
  service = new AuthService();
  accountService = new AccountService();

  /**
   * Register a new user
   */
  public async register({ request, response }: HttpContextContract) {
    try {
      const userData = await request.validate(CreateAccountValidator);
      console.log(userData, "PASS at Register")
      await this.service.register(userData, request);
      console.log(typeof userData, "Finalyy Pass register");
      return response.api(
        null,
        "Registrasi berhasil! Silakan verifikasi email Anda.",
        201
      );
    } catch (error) {
      if (error.messages) {
        return response.error("Validasi gagal", error.messages, 422);
      }
      console.log(error, "ERROR at Register Controller")
      return response.error(error.message, null, error.status || 400);
    }
  }
  /**
   * Verifikasi email pengguna
   */
  public async verifyEmail({ request, response }: HttpContextContract) {
    try {
      const token = request.input("token");

      if (!token) {
        return response.error("Token verifikasi tidak ditemukan.", null, 400);
      }

      await this.service.verifyEmail(token);
      return response.api({
        title: 'Verifikasi Berhasil!',
        message: 'Email Anda telah berhasil diverifikasi. Anda sekarang dapat mengakses PIS Japan Career.',
        fe_url : process.env.BASE_URL
      }, "OK", 200);
    } catch (error) {
      return response.error(error.message, null, error.status || 400);
    }
  }
  /**
   * Resend Verification Email
   */
  public async resendVerifyEmail({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(ResendVerifyEmailValidator);
      await this.service.resendVerifyEmail(data.email, request);
      return response.api(
        null,
        "Email verifikasi telah dikirim ulang! Silakan periksa email Anda.",
        200
      );
    } catch (error) {
      if (error.messages) {
        return response.error("Validasi gagal", error.messages, 422);
      }
      return response.error(error.message, null, error.status || 400);
    }
  }
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const credentials = this.getBasicAuth(request.header("authorization"));
      console.log("==User Credential==",credentials)
      const rememberMe = request.body().remember_me ?? false;
      const token = await this.service.login(credentials, auth, rememberMe);
      console.log("==User Token==",token)
      return response.api(token, "OK", 200, request);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
      return response.api(null, "Logout successful!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async oauthRedirect({ ally, response }) {
    try {
      return ally.use("google").redirect();
    } catch (error) {
      return response.error(error.message);
    }
  }

  /**
   * Callback setelah OAuth (Google)
   */
  public async oauthCallback({ ally, auth, response }: HttpContextContract) {
    try {
      const google = await ally.use("google").user();
      let user = await this.accountService.findByEmail("" + google.email);
      if (!user) {
        return response.error("Akun tidak terdaftar", null, 404);
      } else {
        if (!user.google_id) {
          await this.accountService.update(user.id, {
            google_id: google.id,
            is_verified: true,
          });
        }
        await user.load("role");
        const authResult = await this.service.generateToken(auth, user, true);
        const encodeToken = Buffer.from(JSON.stringify(authResult)).toString(
          "base64"
        );
        return response
          .redirect()
          .toPath(`http://localhost:3333/google-redirect?token=${encodeToken}`);
      }
    } catch (error) {
      return response.error(error.message, null, error.status || 400);
    }
  }

  public async forgotPassword({ request, response }) {
    try {
      const data = await request.all();
      await this.service.forgotPassword(data.credential, request);
      return response.api(
        null,
        "Forgot password link has been sent to your email"
      );
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async restorePassword({ request, response }) {
    try {
      const data = await request.all();
      await this.service.restorePassword(data);
      return response.api(null, "Password restored!");
    } catch (error) {
      return response.error(error.message);
    }
  }
  /**
   * Mendapatkan credentials dari header Authorization
   */
  private getBasicAuth(authHeader: any) {
    if (!authHeader) {
      throw new DefaultException("Authorization header missing", 401);
    }
    const decoded = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString("ascii")
      .split(":");
    if (decoded.length !== 2) {
      throw new DefaultException("Invalid authorization format", 400);
    }
    return { email: decoded[0], password: decoded[1] };
  }
}
