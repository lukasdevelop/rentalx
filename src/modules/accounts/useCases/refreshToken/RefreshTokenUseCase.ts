import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayload {
    sub: string,
    email: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string) {
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token,
        );

        if (!userToken) {
            throw new AppError('Refresh Token does not exists!');
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        console.log('Uzecase', refresh_token)

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token

    }
}

export { RefreshTokenUseCase };
