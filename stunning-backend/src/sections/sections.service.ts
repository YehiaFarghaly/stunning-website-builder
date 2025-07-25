import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from '../schemas/section.schema';
import { CreateSectionsDto, SectionResponseDto } from '../dto/create-sections.dto';
import { LlmService } from '../services/llm.service';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private llmService: LlmService,
  ) {}

  async createSections(createSectionsDto: CreateSectionsDto): Promise<SectionResponseDto[]> {
    const { websiteIdea } = createSectionsDto;
    
    try {
      const generatedSections = await this.llmService.generateWebsiteSections(websiteIdea);
      
      const savedSections = await Promise.all(
        generatedSections.map(async (section, index) => {
          const newSection = new this.sectionModel({
            websiteIdea,
            title: section.title,
            description: section.description,
            order: index + 1,
          });
          return await newSection.save();
        })
      );

      return savedSections.map(section => ({
        title: section.title,
        description: section.description,
        order: section.order,
        websiteIdea: section.websiteIdea,
        createdAt: section.createdAt,
      }));
    } catch (error) {
      console.error('Error creating sections:', error);
      throw new Error('Failed to generate website sections');
    }
  }

  async getSectionsByIdea(websiteIdea: string): Promise<SectionResponseDto[]> {
    const sections = await this.sectionModel
      .find({ websiteIdea })
      .sort({ order: 1 })
      .exec();
    
    return sections.map(section => ({
      title: section.title,
      description: section.description,
      order: section.order,
      websiteIdea: section.websiteIdea,
      createdAt: section.createdAt,
    }));
  }
}