import Route from "@ioc:Adonis/Core/Route";

Route.resource("/pemain", "PemainsController").apiOnly();
Route.post("/pemain/:timId", "PemainsController.store");
// Route.put('/pemains/:timId/:id', 'PemainsController.update')
