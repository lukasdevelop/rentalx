import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { Router } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export { carsRouter }   