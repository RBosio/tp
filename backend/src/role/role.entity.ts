import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @ManyToMany(() => User, users => users.roles)
    users: User[]
    
    @Column({type: Date, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}