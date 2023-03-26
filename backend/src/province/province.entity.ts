import { City } from 'src/city/city.entity'
import { Country } from 'src/country/country.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

    @OneToMany(() => City, cities => cities.province)
    cities: City[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}