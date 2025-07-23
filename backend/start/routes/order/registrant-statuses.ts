import Route from '@ioc:Adonis/Core/Route'
const middlewareAdmin = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete('/', 'Order/RegistrantStatusController.destroyAll').as('registrant-statuses.destroyAll')
}).prefix('registrant-statuses')
Route.resource('registrant-statuses', 'Order/RegistrantStatusController').apiOnly().middleware({
  store: middlewareAdmin,
  update:middlewareAdmin,
  destroy:middlewareAdmin,
})
