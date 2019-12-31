import {MigrationInterface, QueryRunner} from "typeorm";

/**
 * 涉及表: article
 * 1.新增public字段
 */
export class article1577632261140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE article ADD public INT NOT NULL DEFAULT 1;')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE article DROP public;')
    }

}
