export interface Property {
  id?: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'land' | string;
  images?: string[];
}
