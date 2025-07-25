import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionsController } from './sections/sections.controller';
import { SectionsService } from './sections/sections.service';
import { LlmService } from './services/llm.service';
import { Section, SectionSchema } from './schemas/section.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/stunning-db'),
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  controllers: [AppController, SectionsController],
  providers: [AppService, SectionsService, LlmService],
})
export class AppModule {}
