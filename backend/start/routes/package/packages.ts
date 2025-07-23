import Route from "@ioc:Adonis/Core/Route";
const middleware = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete("/", "Package/PackageController.destroyAll").as(
    "packages.destroyAll"
  );
}).prefix("packages").middleware('role:ADMIN');
Route.resource("packages", "Package/PackageController").apiOnly().middleware({
  store: middleware,
  update: middleware,
  destroy: middleware,
});
