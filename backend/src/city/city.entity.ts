import { Province } from 'src/province/province.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class City {
    @PrimaryColumn()
    zipCode: string

    @Column()
    name: string

    @Column()
    provinceId: number

    @ManyToOne(() => Province, province => province.cities)
    province: Province
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}