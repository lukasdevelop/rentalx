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