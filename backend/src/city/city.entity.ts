import { Province } from 'src/province/province.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

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

    @OneToMany(() => User, user => user.city)
    users: User[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}