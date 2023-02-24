import { Router} from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { carsRouter } from './cars.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRouter)
router.use(authenticateRoutes, usersRoutes)

export {router}