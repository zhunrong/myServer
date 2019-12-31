import {MigrationInterface, QueryRunner} from "typeorm";

/**
 * 涉及表: article
 * 1.修改article.title字段长度由50至255
 */
export class article1577769652483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE article MODIFY title VARCHAR(255) NOT NULL;')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE article MODIFY title VARCHAR(50) NOT NULL;')
    }

}
