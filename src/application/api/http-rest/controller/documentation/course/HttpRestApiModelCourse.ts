import { CourseType } from '@core/common/enums/CourseEnums';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCourse {
  
  // @ApiProperty({type: 'string'})
  // public id: string;
  
  @ApiProperty({type: 'string'})
  public ownerId: string;

  @ApiProperty({type: 'string'})
  public id: string;
  
  @ApiProperty({type: 'string'})
  public title: string;

  @ApiProperty({type: 'string'})
  public description: string;

  @ApiProperty({type: 'string'})
  public pdfDetails: string;

  @ApiProperty({type: 'string'})
  public keywords: string[];
  
  @ApiProperty({enum: CourseType})
  public type: CourseType;
  
  // @ApiProperty({type: 'string'})
  // public url: string;
  
  @ApiProperty({type: 'number'})
  public createdAt: number;
  
  @ApiProperty({type: 'number', required: false})
  public editedAt: number;
  
}
