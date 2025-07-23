import Route from "@ioc:Adonis/Core/Route";

const middleware = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete("/", "Public/PhaseController.destroyAll").as(
    "phases.destroyAll"
  );
}).prefix("phases").middleware("role:ADMIN");
Route.resource("phases", "Public/PhaseController")
  .apiOnly()
  .middleware({
    store: middleware,
    update: middleware,
    destroy: middleware,
  });
