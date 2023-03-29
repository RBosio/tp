import { Booking } from 'src/booking/booking.entity'
import { City } from 'src/city/city.entity'
import { Role } from 'src/role/role.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { hash } from 'bcryptjs'

@Entity()
export class User {
    @PrimaryColumn()
    dni: string

    @Column({unique: true})
    email: string
    
    @Column()
    name: string
    
    @Column()
    surname: string
    
    @Column()
    password: string
    
    @Column()
    phone: string

    @ManyToOne(() => City, city => city.users)
    city: City

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[]
    
    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return
        } else {
            this.password = await hash(this.password, 10)
        }
    }
}