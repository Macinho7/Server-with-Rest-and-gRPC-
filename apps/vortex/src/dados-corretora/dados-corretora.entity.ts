/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CorretoraEntity } from '../corretora/corretora.entity';
import { Exclude } from 'class-transformer';
@Entity({ name: 'dadosCorretora' })
export class DadosCorretoraEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ceo', nullable: false })
  ceo: string;
  
  @Exclude()
  @Column({ name: 'senha', nullable: false })
  senha: string;

  @Column({ name: 'email', nullable: false })
  email: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => CorretoraEntity, (dado) => dado.dados, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['remove'] 
  })
  corretora: CorretoraEntity
}