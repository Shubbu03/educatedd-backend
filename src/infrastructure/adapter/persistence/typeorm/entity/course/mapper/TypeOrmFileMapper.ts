import { UploadFile } from "@core/domain/course/entity/UploadFile";
import { FileMetadata } from '@core/domain/media/value-object/FileMetadata';
import { TypeOrmFile } from "../TypeOrmFile";

export class TypeOrmFileMapper {

    public static toOrmEntity(domainCourse: UploadFile): TypeOrmFile {
        const ormCourse: TypeOrmFile = new TypeOrmFile();
        
        
        
        ormCourse.pdfDetails = domainCourse.getMetadata().relativePath;
        
        
        ormCourse.createdAt    = domainCourse.getCreatedAt();
        ormCourse.editedAt     = domainCourse.getEditedAt() as Date;
        ormCourse.removedAt    = domainCourse.getRemovedAt() as Date;
        
        return ormCourse;
      }
      
      public static toOrmEntities(domainCourses: UploadFile[]): TypeOrmFile[] {
        return domainCourses.map(domainCourse => this.toOrmEntity(domainCourse));
      }
      
      public static toDomainEntity(ormCourse: TypeOrmFile): UploadFile {
        const metadata: FileMetadata = new FileMetadata({
          relativePath: ormCourse.pdfDetails,
          
        });
        
        const domainCourse: UploadFile = new UploadFile({
          
        //    pdfDetails:ormCourse.pdfDetails,
         
          metadata : metadata,
          
          createdAt: ormCourse.createdAt,
          editedAt : ormCourse.editedAt,
          removedAt: ormCourse.removedAt,
        });
        
        return domainCourse;
      }
      
      public static toDomainEntities(ormCourses: TypeOrmFile[]): UploadFile[] {
        return ormCourses.map(ormCourse => this.toDomainEntity(ormCourse));
      }
}