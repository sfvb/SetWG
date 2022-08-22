import {MigrationInterface, QueryRunner} from "typeorm";

export class init1661149298575 implements MigrationInterface {
    name = 'init1661149298575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cardspot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card_number" integer NOT NULL, "cardId" uuid, "gameId" uuid NOT NULL, CONSTRAINT "REL_60d132bad71d3ed78144afadf7" UNIQUE ("cardId"), CONSTRAINT "PK_6f5af8d9cf51ef52527803fa208" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "score" ("playerId" uuid NOT NULL, "gameId" uuid NOT NULL, "score" integer NOT NULL, CONSTRAINT "PK_068dbe7e389678e01d13285bc97" PRIMARY KEY ("playerId", "gameId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "externalId" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_bc97b425592aa51df5da7a440a6" UNIQUE ("externalId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardSetId" uuid NOT NULL, "name" character varying NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "ownerId" uuid NOT NULL, "pausedById" uuid, CONSTRAINT "REL_8f7ec1c193979f75b697b510cd" UNIQUE ("cardSetId"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cardset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_c67fb3d3847d3ffc3455e268b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying NOT NULL, "color" character varying NOT NULL, "shape" character varying NOT NULL, "isVisible" boolean NOT NULL, "hasBeenTaken" boolean NOT NULL, "status" character varying NOT NULL, "cardSetId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cardspot" ADD CONSTRAINT "FK_60d132bad71d3ed78144afadf77" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cardspot" ADD CONSTRAINT "FK_006d1250c3d6b7e0e68e1d261e4" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_66f5fb8ee865712db248080d5ea" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_0778913dcc5349f3bcb0ebeab8c" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_8f7ec1c193979f75b697b510cd4" FOREIGN KEY ("cardSetId") REFERENCES "cardset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_f069f63ab49d487b7d02dddf47b" FOREIGN KEY ("pausedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_4f0d934d3919ab9c3fee8f22482" FOREIGN KEY ("cardSetId") REFERENCES "cardset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_4f0d934d3919ab9c3fee8f22482"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_f069f63ab49d487b7d02dddf47b"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_8f7ec1c193979f75b697b510cd4"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_0778913dcc5349f3bcb0ebeab8c"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_66f5fb8ee865712db248080d5ea"`);
        await queryRunner.query(`ALTER TABLE "cardspot" DROP CONSTRAINT "FK_006d1250c3d6b7e0e68e1d261e4"`);
        await queryRunner.query(`ALTER TABLE "cardspot" DROP CONSTRAINT "FK_60d132bad71d3ed78144afadf77"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "cardset"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TABLE "cardspot"`);
    }

}
