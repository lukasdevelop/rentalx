
import { DataSource } from 'typeorm'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Category } from "@modules/cars/infra/typeorm/entities/Category"
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'

const dataSource = new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentalx',
    synchronize: true,
    logging: false,
    entities: [Category, Specification, User, Car, CarImage],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    subscribers: [],
})

export function createConnection(host = 'database'): Promise<DataSource>{
    return dataSource.setOptions({ host }).initialize()
}

export default dataSource
