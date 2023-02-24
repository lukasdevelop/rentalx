import { v4 as uuidv4} from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity("categories")
class Category {

    @PrimaryGeneratedColumn('uuid')
    id?: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4()
        }
    }
}

export { Category }