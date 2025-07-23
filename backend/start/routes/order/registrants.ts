import Route from "@ioc:Adonis/Core/Route";

const middlewareAdmin = ["auth", "role:ADMIN", "isVerified"];
const middlewareUser = ["auth", "role:USER", "isVerified"];
Route.group(function () {
  Route.delete("/", "Order/RegistrantController.destroyAll").as(
    "registrants.destroyAll"
  );
})
  .prefix("registrants")
  .middleware("role:ADMIN");
Route.get("/registrants/count", "Order/RegistrantController.count")
  .as("registrants.count")
  .middleware(middlewareAdmin);
Route.group(function () {
  Route.get("/my-transaction", "Order/RegistrantController.currentRegistrant")
}).prefix("registrants").middleware(middlewareUser);
Route.resource("registrants", "Order/RegistrantController")
  .apiOnly()
  .middleware({
    index: middlewareAdmin,
    store: middlewareUser,
    update: middlewareAdmin,
    destroy: middlewareAdmin,
  });

Route.get("/batches/:batchId/registrants", "Order/RegistrantController.getRegistrantsByBatch")
  .middleware(middlewareAdmin);
