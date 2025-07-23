import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'Auth/AuthController.login').as('auth.login')
Route.post('/logout', 'Auth/AuthController.logout').as('auth.logout').middleware('auth')
Route.post('/register', 'Auth/AuthController.register').as('auth.register')
Route.get('/verify-email', 'Auth/AuthController.verifyEmail').as('auth.verify-email')
Route.post('/resend-verify-email', 'Auth/AuthController.resendVerifyEmail').as('auth.resend-verify-email')
Route.get('/google/redirect', 'Auth/AuthController.oauthRedirect').as('auth.redirect')
Route.get('/google/callback', 'Auth/AuthController.oauthCallback').as('auth.callback')
Route.post('/forgot-password', 'Auth/AuthController.forgotPassword').as('auth.forgot-password')
Route.post('/reset-password', 'Auth/AuthController.restorePassword').as('auth.reset-password')
