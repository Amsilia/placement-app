import Route from '@ioc:Adonis/Core/Route'

const middleware = ['auth', 'role:ADMIN', 'isVerified']
Route.group(function () {
  Route.delete('/', 'User/RoleController.destroyAll').as('roles.destroyAll')
}).prefix('roles')
Route.resource('roles', 'User/RoleController').apiOnly().middleware({
  "*" : middleware
})
