import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}