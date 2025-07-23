import Route from '@ioc:Adonis/Core/Route'
const middleware = ['auth', 'role:ADMIN', 'isVerified']
Route.group(function () {
  Route.delete('/', 'Package/BatchController.destroyAll').as('batches.destroyAll')
}).prefix('batches').middleware('role:ADMIN')
Route.resource('batches', 'Package/BatchController').apiOnly().middleware({
  store: middleware,
  update:middleware,
  destroy: middleware,
})

Route.get('packages/:id/batches', 'Package/BatchController.indexByPackage').middleware(middleware)
