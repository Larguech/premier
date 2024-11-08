import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from './status.enum'; // Assurez-vous d'avoir défini l'enum StatusEnum
import { BaseEntity } from './base.entity'; // Importe la classe de base ex6

@Entity('todos2') // Nom de la table
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
