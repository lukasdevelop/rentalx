import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UsersTokens";
import { Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm";


class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>

    constructor(){
        this.repository = dataSource.getRepository(UserTokens)
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        
        const userToken = await this.repository.findOneBy({refresh_token})

        return userToken
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usersToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token
            }    
        })

        return usersToken
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken
    }

}

export { UsersTokensRepository }