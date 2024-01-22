import { Extra } from 'src/extra/extra.entity'
import { Room } from 'src/room/room.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Booking {
    @PrimaryColumn()
    userDni: string

    @PrimaryColumn({type: 'datetime'})
    admissionDate: Date

    @Column()
    roomId: number

    @Column({type: 'datetime'})
    departureDate: Date

    @Column({default: 'Pendiente'})
    status: string
    
    @ManyToOne(() => User, user => user.bookings)
    user: User

    @ManyToOne(() => Room, room => room.bookings)
    room: Room

    @ManyToMany(() => Extra, extra => extra.bookings)
    @JoinTable()
    extras: Extra[]
}