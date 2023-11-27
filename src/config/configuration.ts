import { Logger } from '@nestjs/common';
import { IsString, validateSync } from 'class-validator';

// import dotenv = require("dotenv");
import { config } from 'dotenv';
config();

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsString()
  readonly MONGODB_URI = process.env.MONGODB_URI as string;

  constructor() {
    const error = validateSync(this);

    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error[0])}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
