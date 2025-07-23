import Route from "@ioc:Adonis/Core/Route";

const middlewareAdmin = ["auth", "role:ADMIN", "isVerified"];
const middleware = ["auth", "isVerified"]
Route.group(function () {
  Route.delete("/", "User/AccountController.destroyAll").as("users.destroyAll");
}).prefix("users");
Route.delete('/users/delete-multiple', 'User/AccountController.deleteMultiple').middleware('auth');
Route.resource("users", "User/AccountController")
  .apiOnly()
  .middleware({
    index: middlewareAdmin,
    show: middleware,
    store: middlewareAdmin,
    update: middleware,
    destroy: middlewareAdmin,
  });

Route.group(function () {
  Route.get("/my-account", "User/AccountController.userProfile")
    .as("users.profile");
  Route.put("/my-account", "User/AccountController.updateProfile")
    .as("users.updateProfile");
  Route.put("/my-account/change-password", "User/AccountController.changePassword")
    .as("users.changePassword");
}).middleware(middleware);