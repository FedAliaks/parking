import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746079501798 implements MigrationInterface {
    name = 'Migration1746079501798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."parking_spots_location_enum" AS ENUM('Minsk highway', 'Brest highway', 'Grodno highway')`);
        await queryRunner.query(`CREATE TABLE "parking_spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" "public"."parking_spots_location_enum" NOT NULL DEFAULT 'Minsk highway', CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reserved_date" TIMESTAMP NOT NULL, "reserved_time" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "user_id" uuid, "parking_spot_id" uuid, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(30) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_4af5055a871c46d011345a255a6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_8281a432ff1ee5db35d1446b0d8" FOREIGN KEY ("parking_spot_id") REFERENCES "parking_spots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_8281a432ff1ee5db35d1446b0d8"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_4af5055a871c46d011345a255a6"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "parking_spots"`);
        await queryRunner.query(`DROP TYPE "public"."parking_spots_location_enum"`);
    }

}
