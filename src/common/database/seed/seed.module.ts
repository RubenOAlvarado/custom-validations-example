import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle.module';
import { SeedService } from './seed.service';

@Module({
  imports: [DrizzleModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
