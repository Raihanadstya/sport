import Route from '@ioc:Adonis/Core/Route'

Route.resource('/klasemen', 'KlasemensController').apiOnly()
Route.post('/klasemen/:timId', 'KlasemensController.store')
// Route.put('/pemains/:timId/:id', 'PemainsController.update')