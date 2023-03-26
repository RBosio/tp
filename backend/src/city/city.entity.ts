import { Province } from 'src/province/province.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    provinceId: number

    @ManyToOne(() => Province, province => province.cities)
    province: Province
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}