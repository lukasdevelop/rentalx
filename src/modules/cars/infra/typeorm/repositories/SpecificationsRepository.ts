import { In, Repository } from "typeorm";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import dataSource from "@shared/infra/typeorm";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor(){
        this.repository = dataSource.getRepository(Specification)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.find({
            where: { id: In([...ids])}
        })

        return specifications
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOneBy({
            name
        })

        return specification
          
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)

        return specification
    }

}

export { SpecificationsRepository }