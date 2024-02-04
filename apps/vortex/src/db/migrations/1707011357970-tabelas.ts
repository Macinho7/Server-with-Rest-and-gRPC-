import { MigrationInterface, QueryRunner } from "typeorm";

export class Tabelas1707011357970 implements MigrationInterface {
    name = 'Tabelas1707011357970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "corretora" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "fundacao" character varying NOT NULL, "especializacao" character varying NOT NULL, "local" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_066fcee602f5df9ea0677cc5c4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dadosCorretora" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ceo" character varying NOT NULL, "senha" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "corretoraId" uuid, CONSTRAINT "PK_84e18a279117c0011c4918e9c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dadosCorretora" ADD CONSTRAINT "FK_4953748906269c3d4e30bc6d3f7" FOREIGN KEY ("corretoraId") REFERENCES "corretora"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dadosCorretora" DROP CONSTRAINT "FK_4953748906269c3d4e30bc6d3f7"`);
        await queryRunner.query(`DROP TABLE "dadosCorretora"`);
        await queryRunner.query(`DROP TABLE "corretora"`);
    }

}
