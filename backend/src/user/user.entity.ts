import { Role } from 'src/role/role.entity'
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

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

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}