import { Column, Entity, PrimaryColumn } from 'typeorm'

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
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}