import Route from '@ioc:Adonis/Core/Route'

Route.resource('/pemains', 'PemainsController').only(['index', 'show', 'destroy', 'update'])
Route.post('/pemains/:timId', 'PemainsController.store')
// Route.put('/pemains/:timId/:id', 'PemainsController.update')