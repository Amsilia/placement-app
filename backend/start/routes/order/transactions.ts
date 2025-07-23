import Route from '@ioc:Adonis/Core/Route'
// soon next development
Route.group(function () {
  Route.delete('/', 'Order/TransactionController.destroyAll').as('transactions.destroyAll')
}).prefix('transactions')
Route.resource('transactions', 'Order/TransactionController').apiOnly()
Route.get('/transactions/by-registrant/:registrantId', 'Order/TransactionController.byRegistrant')


