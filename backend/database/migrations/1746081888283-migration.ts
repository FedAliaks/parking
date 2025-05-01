import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746081888283 implements MigrationInterface {
  name = 'Migration1746081888283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(30) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parking_spots_location_enum" AS ENUM('Minsk highway', 'Brest highway', 'Grodno highway')`,
    );
    await queryRunner.query(
      `CREATE TABLE "parking_spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" "public"."parking_spots_location_enum" NOT NULL DEFAULT 'Minsk highway', CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "parking_spot_id" uuid NOT NULL, "reserved_date" date NOT NULL, "reserved_time" TIME NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
        ALTER TABLE "reservations"
        ADD CONSTRAINT "FK_reservation_user"
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE "reservations"
        ADD CONSTRAINT "FK_reservation_parking_spot"
        FOREIGN KEY ("parking_spot_id") REFERENCES "parking_spots"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP CONSTRAINT "FK_reservation_parking_spot"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP CONSTRAINT "FK_reservation_user"`,
    );
    await queryRunner.query(`DROP TABLE "reservations"`);
    await queryRunner.query(`DROP TABLE "parking_spots"`);
    await queryRunner.query(`DROP TYPE "public"."parking_spots_location_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
