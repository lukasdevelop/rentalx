import { Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";


import { User } from "../entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = dataSource.getRepository(User)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email })

        return user
    }
    
    async create({name, email, driver_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        })

        await this.repository.save(user)
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({id})

        return user

    }
}

export { UsersRepository }