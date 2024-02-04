/* eslint-disable prettier/prettier */
import { DadosCorretoraEntity } from '../dados-corretora/dados-corretora.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'corretora'})
export class CorretoraEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'nome', nullable: false})
    nome: string

    @Column({name: 'fundacao', nullable: false})
    fundacao:string

    @Column({name: 'especializacao', nullable: false})
    especializacao: string

    @Column({name: 'local', nullable: false})
    local: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToMany(() => DadosCorretoraEntity, (dado) => dado.corretora, {
         onDelete: 'CASCADE',
         eager: true,
         onUpdate: 'CASCADE',
    })
    dados: DadosCorretoraEntity[]
}
