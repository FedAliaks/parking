import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746096111351 implements MigrationInterface {
  name = 'Migration1746096111351';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parking_spots" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_spots" ADD CONSTRAINT "UQ_9e577d7703aeb590cdc1b29dadc" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_spots" DROP COLUMN "location"`,
    );
    await queryRunner.query(`DROP TYPE "public"."parking_spots_location_enum"`);
    await queryRunner.query(
      `ALTER TABLE "parking_spots" ADD "location" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parking_spots" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parking_spots_location_enum" AS ENUM('Minsk highway', 'Brest highway', 'Grodno highway')`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_spots" ADD "location" "public"."parking_spots_location_enum" NOT NULL DEFAULT 'Minsk highway'`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_spots" DROP CONSTRAINT "UQ_9e577d7703aeb590cdc1b29dadc"`,
    );
    await queryRunner.query(`ALTER TABLE "parking_spots" DROP COLUMN "name"`);
  }
}
