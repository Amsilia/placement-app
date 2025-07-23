import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'

export default class IsVerifiedMiddleware {
  /**
   * Handle the incoming request.
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      const user = await auth.use('api').authenticate()

      if (!user.is_verified) {
        throw new AuthException('Email belum diverifikasi!', 403, 'E_UNAUTHORIZED_ACCESS')
      }

      await next()
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        throw error
      }
      throw new AuthException('Unauthorized', 401, 'E_UNAUTHORIZED_ACCESS')
    }
  }
}
