import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { hash } from "bcryptjs";

interface IRequest {
    token: string
    password: string
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider") private dateProvider: IDateProvider,
        @inject("UsersRepository") private userRepository: IUsersRepository
        ){}
    
    async execute({token, password}: IRequest): Promise<void>{
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if(!userToken){
            throw new AppError("Token invalid!")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError('Token expired!')
        }

        const user = await this.userRepository.findById(userToken.id)

        user.password = await hash(password, 8)

        await this.userRepository.create(user)

        await this.usersTokensRepository.deleteById(userToken.id)
    }
}

export { ResetPasswordUserUseCase }