import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCoursetable1697019890477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE public."course"
    ADD COLUMN chapter VARCHAR(100);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
