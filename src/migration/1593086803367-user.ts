import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * 更新user表字段
 */
export class user1593086803367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN email VARCHAR(255);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN nickname VARCHAR(255);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN avatar VARCHAR(255);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN password VARCHAR(255);'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN email VARCHAR(20);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN nickname VARCHAR(20);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN avatar VARCHAR(100);'
    );
    await queryRunner.query(
      'ALTER TABLE user MODIFY COLUMN password VARCHAR(40);'
    );
  }
}
