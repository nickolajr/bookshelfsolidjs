import { Volume } from './Volume'; 

export class Book {
    id: number = 0;
    title: Title = new Title();
    coverImage: CoverImage = new CoverImage();
    volumes?: Volume[] = []; 
    format: string = "";
    showdetails: boolean = false;
}
  
  class CoverImage {
    large?: string = "";
  }
  
  class Title {
    english?: string = "";
    romaji?: string = "";
    native?: string = "";
  }