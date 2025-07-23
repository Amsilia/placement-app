import Route from "@ioc:Adonis/Core/Route";

const middleware = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete("/", "Public/SiteController.destroyAll").as("sites.destroyAll");
}).prefix("sites").middleware("role:ADMIN");
Route.delete("sites/delete-logo1", "Public/SiteController.deleteLogo1").middleware("auth");
Route.delete("sites/delete-logo2", "Public/SiteController.deleteLogo2").middleware("auth");
Route.resource("sites", "Public/SiteController")
  .except(['update'])
  .middleware({
    store: middleware,
    update: middleware,
    destroy: middleware
  });
