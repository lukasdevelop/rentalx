import { container} from 'tsyringe'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import "@shared/container/providers"

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", 
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", 
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImagesRepository>("CarsImagesRepository", CarsImagesRepository)

container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository)