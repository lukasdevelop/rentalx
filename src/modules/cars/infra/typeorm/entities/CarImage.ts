import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cars_image")
class CarImage {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    car_id: string

    @Column()
    image_name: string

    @CreateDateColumn()
    created_at: Date
}

export { CarImage }