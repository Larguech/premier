import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from './status.enum'; // Assurez-vous d'avoir défini l'enum StatusEnum
import { BaseEntity } from './base.entity'; // Importe la classe de base ex6

@Entity('todos2') // Nom de la table
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 255 })
  description: string;

  // Colonne createdAt qui ne peut être modifiée une fois créée
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Colonne updatedAt automatiquement mise à jour par TypeORM
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Colonne deletedAt automatiquement gérée par TypeORM pour la suppression douce (soft delete)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
