import { Command, CommandRunner } from 'nest-commander';
import { SeedService } from './seed.service';
import { Logger } from '@nestjs/common';

@Command({ name: 'seed', description: 'Seed the database' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedService: SeedService) {
    super();
  }

  private logger = new Logger(SeedCommand.name);

  async run(passedParams: string[]): Promise<void> {
    this.logger.log('Running seed command with parameters:', passedParams);
    const [action = 'run'] = passedParams;

    switch (action) {
      case 'run':
        await this.seedService.runSeed();
        break;
      case 'clear':
        await this.seedService.clearSeed();
        break;
      default:
        this.logger.warn(`Unknown action: ${action}`);
    }
    this.logger.log('Seed command completed.');
  }
}
