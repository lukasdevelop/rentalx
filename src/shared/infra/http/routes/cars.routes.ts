import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UploadCarImageController } from '@modules/cars/uploadCarImage/UploadCarImageController'

const carsRouter = Router()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()

carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRouter.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)

export { carsRouter }   