import Route from "@ioc:Adonis/Core/Route";
const middleware = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete("/", "Package/PriceController.destroyAll").as(
    "prices.destroyAll"
  );
})
  .prefix("prices")
  .middleware("role:ADMIN");
Route.resource("prices", "Package/PriceController").apiOnly().middleware({
  store: middleware,
  update: middleware,
  destroy: middleware,
});

Route.get(
  "batches/:id/prices",
  "Package/PriceController.indexByBatch"
).middleware(middleware);
