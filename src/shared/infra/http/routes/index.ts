import { Router} from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { carsRouter } from './cars.routes'
import { rentalRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRouter)
router.use('/rentals', rentalRoutes)
router.use('/password', passwordRoutes)
router.use(authenticateRoutes)

export {router}