export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    categories?: string[];
    description?: string;
    [key: string]: any;
  }
}