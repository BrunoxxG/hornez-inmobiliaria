export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'land' | 'commercial';
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  url: string;
  public_id: string;
  created_at: string;
}

export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'land' | 'commercial';
}

export interface UpdatePropertyDTO extends Partial<CreatePropertyDTO> {
  id: string;
}
