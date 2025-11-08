import { Module } from '@nestjs/common';
import { ConfigModule } from '@common/config/config.module';
import { SeedModule } from './seed.module';
import { SeedCommand } from './seed.command';

@Module({
  imports: [ConfigModule, SeedModule],
  providers: [SeedCommand],
})
export class SeedCliModule {}
