import { Province } from 'src/province/province.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Extra {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    price: number
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}