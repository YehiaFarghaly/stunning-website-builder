import { Controller, Post, Get, Body, Query, ValidationPipe } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionsDto, SectionResponseDto } from '../dto/create-sections.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async createSections(
    @Body(ValidationPipe) createSectionsDto: CreateSectionsDto,
  ): Promise<SectionResponseDto[]> {
    return this.sectionsService.createSections(createSectionsDto);
  }

  @Get()
  async getSections(
    @Query('websiteIdea') websiteIdea: string,
  ): Promise<SectionResponseDto[]> {
    return this.sectionsService.getSectionsByIdea(websiteIdea);
  }
}