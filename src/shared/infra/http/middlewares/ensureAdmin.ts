import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import {Request, Response, NextFunction } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    const { id } = request.user

    const userRepository = new UsersRepository()
    const user = await userRepository.findById(id)

    if(!user.isAdmin) {
        throw new AppError("User not is admin!")
    }

    return next()
}