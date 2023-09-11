export class DoesCourseExistQueryResult {
  
    public readonly doesExist: boolean;
    
    constructor(doesExist: boolean) {
      this.doesExist = doesExist;
    }
    
    public static new(doesExist: boolean): DoesCourseExistQueryResult {
      return new DoesCourseExistQueryResult(doesExist);
    }
    
  }
  