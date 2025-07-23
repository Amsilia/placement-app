import Route from '@ioc:Adonis/Core/Route'

const middlewareAdmin = ["auth", "role:ADMIN", "isVerified"];

Route.group(function () {
  Route.delete('/', 'User/TestimonialController.destroyAll').as('testimonials.destroyAll')
}).prefix('testimonials')
Route.resource('testimonials', 'User/TestimonialController')
  .apiOnly()
  .middleware({
    store: middlewareAdmin,
    update: middlewareAdmin,
    destroy: middlewareAdmin,
  })
