import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUserCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => { 
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: '123045',
            email: 'teste@email.com',
            password: '1234',
            name: 'User Test',
        }   
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it('should not be able tto authenticate an non existent user ', async () => {
        await expect(
             authenticateUserUseCase.execute({
                email: "false@email.com",
                password: '1234'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '9999',
            email: 'teste@email.com',
            password: '123456',
            name: 'User Test Error'
        }
        createUserUseCase.execute(user)
        
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'errada01'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})