import { Booking } from 'src/booking/booking.entity'
import { Province } from 'src/province/province.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

    @ManyToMany(() => Booking, booking => booking.extras)
    bookings: Booking[]
}