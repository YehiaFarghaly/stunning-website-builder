import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSectionsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Website idea must be at least 5 characters long' })
  websiteIdea: string;
}

export class SectionResponseDto {
  title: string;
  description: string;
  order: number;
  websiteIdea: string;
  createdAt: Date;
}