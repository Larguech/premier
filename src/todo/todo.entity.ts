import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { StatusEnum } from './status.enum'; // Enum pour le statut

@Entity('todo') // Nom de la table
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: StatusEnum, // Utilise l'énumération définie
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
