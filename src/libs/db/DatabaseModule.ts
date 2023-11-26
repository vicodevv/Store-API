// libs/db/DatabaseModule.ts
import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Config } from 'src/libs/config/configuration';
import mongoose from 'mongoose';

export let connection = {} as mongoose.Connection;

class DatabaseService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    try {
      await mongoose.connect(Config.MONGO_URI, {});

      connection = mongoose.connection;

      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await mongoose.disconnect();
  }
}

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Export DatabaseService
})
export class DatabaseModule {}
