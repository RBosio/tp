import { Booking } from 'src/booking/booking.entity'
import { Type } from 'src/type/type.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    image: string

    @Column()
    price: number

    @Column()
    typeId: number

    @ManyToOne(() => Type, type => type.rooms)
    type: Type

    @OneToMany(() => Booking, booking => booking.room)
    bookings: Booking[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}