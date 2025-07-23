import Route from "@ioc:Adonis/Core/Route";

const middleware = ["auth", "role:ADMIN", "isVerified"];
Route.group(function () {
  Route.delete("/", "Public/ArticleController.destroyAll").as(
    "articles.destroyAll"
  );
}).prefix("articles").middleware("role:ADMIN");

Route.get("articles/:slug", "Public/ArticleController.show").as("articles.show");

Route.resource("articles", "Public/ArticleController")
  .except(["show"])
  .middleware({
    store: middleware,
    update: middleware,
    destroy: middleware,
  })
