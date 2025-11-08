import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIZZLE } from '../drizzle.module';
import { DrizzleClient } from '../drizzle.client';
import { reset, seed } from 'drizzle-seed';
import * as schema from '../schemas';
import { getTableName, isTable, sql } from 'drizzle-orm';

@Injectable()
export class SeedService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleClient) {}

  private logger = new Logger(SeedService.name);

  async runSeed(): Promise<void> {
    try {
      this.logger.log('Starting database seeding...');
      await seed(this.db, schema);
      await this.updateSequence();
      this.logger.log('Database seeding completed successfully.');
    } catch (error) {
      this.logger.error('Error seeding the database:', error);
    }
  }

  async clearSeed(): Promise<void> {
    try {
      this.logger.log('Starting database reset...');
      await reset(this.db, schema);
      this.logger.log('Database reset completed successfully.');
    } catch (error) {
      this.logger.error('Error clearing the database:', error);
    }
  }

  private async updateSequence(): Promise<void> {
    try {
      for (const table of Object.values(schema)) {
        if ('id' in table && table.id && isTable(table)) {
          const tableName = getTableName(table);
          this.logger.log(`Resetting sequence for table: ${tableName}`);
          if (!table.id.generatedIdentity) {
            this.logger.warn(
              `Table ${tableName} does not have an auto-generated id column. Skipping sequence reset.`,
            );
            continue;
          }
          await this.db.execute(sql`
          SELECT setval(
            pg_get_serial_sequence(${tableName}, 'id'),
            COALESCE((SELECT MAX(id) FROM ${sql.identifier(tableName)}), 0) + 1,
            false
          )
        `);

          this.logger.log(
            `Sequence for table ${tableName} updated successfully.`,
          );
        }
      }
    } catch (error) {
      this.logger.error('Error resetting sequences:', error);
    }
  }
}
