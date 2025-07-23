import Route from "@ioc:Adonis/Core/Route";

const middleware = ["auth", "role:ADMIN", "isVerified"];

Route.group(function () {
  Route.get('/data', 'Public/DashboardController.dashboardData')
  Route.get('/registrant-batch', 'Public/DashboardController.countRegistrantBatch')
  Route.get('/registrant-package', 'Public/DashboardController.countRegistrantPackage')
  Route.get('/registrant-year', 'Public/DashboardController.countRegistrantYear')
}).prefix('dashboard').middleware(middleware)
