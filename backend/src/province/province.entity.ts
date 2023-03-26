import { Country } from 'src/country/country.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Province {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    countryId: number

    @ManyToOne(() => Country, country => country.provinces)
    country: Country
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}