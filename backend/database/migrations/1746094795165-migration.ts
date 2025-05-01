import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746094795165 implements MigrationInterface {
    name = 'Migration1746094795165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "parking_spot_id" uuid NOT NULL, "reserved_date" date NOT NULL, "reserved_time" TIME NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(30) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."parking_spots_location_enum" AS ENUM('Minsk highway', 'Brest highway', 'Grodno highway')`);
        await queryRunner.query(`CREATE TABLE "parking_spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" "public"."parking_spots_location_enum" NOT NULL DEFAULT 'Minsk highway', CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "parking_spots"`);
        await queryRunner.query(`DROP TYPE "public"."parking_spots_location_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
