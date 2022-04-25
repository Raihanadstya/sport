import Route from '@ioc:Adonis/Core/Route'

Route.resource('/tims', 'TimsController').apiOnly()

// Route.post('/tims/:userId', 'TimsController.store')
// Route.put('/tims/:id/:userId', 'TimsController.update')

