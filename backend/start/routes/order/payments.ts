import Route from '@ioc:Adonis/Core/Route'
// soon next development
Route.group(function () {
  Route.delete('/', 'Order/PaymentController.destroyAll').as('payments.destroyAll')
}).prefix('payments')
Route.resource('payments', 'Order/PaymentController').apiOnly()
