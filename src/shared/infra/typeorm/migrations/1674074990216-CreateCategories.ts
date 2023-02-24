import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategories1674074990216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("categories")
    }

}
