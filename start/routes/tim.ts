import Route from '@ioc:Adonis/Core/Route'

Route.resource('/tim', 'TimsController').apiOnly()
Route.get('/tim/cabor', 'TimsController.cabor')
