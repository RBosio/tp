import { Province } from 'src/province/province.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @OneToMany(() => Province, provinces => provinces.country)
    provinces: Province[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}