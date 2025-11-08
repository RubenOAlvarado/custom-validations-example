import { CommandFactory } from 'nest-commander';
import { SeedCliModule } from './seed-cli.module';

async function bootstrap() {
  await CommandFactory.run(SeedCliModule, ['debug', 'warn', 'error', 'log']);
  process.exit(0);
}

void bootstrap().catch((error) => {
  console.error('Error bootstrapping application:', error);
  process.exit(1);
});
