import api from './api';
import type { Property, CreatePropertyDTO, UpdatePropertyDTO } from '../types/property';
import type { ApiResponse, PaginatedResponse } from '../types/api';

export const propertyService = {
  // Get all properties
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get<ApiResponse<PaginatedResponse<Property>>>(
      '/properties',
      { params: { page, limit } }
    );
    return response.data.data;
  },

  // Get property by ID
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  },

  // Create property
  create: async (data: CreatePropertyDTO, images?: File[]) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('location', data.location);
    formData.append('type', data.type);

    if (images) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await api.post<ApiResponse<Property>>(
      '/properties',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  // Update property
  update: async (id: string, data: UpdatePropertyDTO, images?: File[]) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.price) formData.append('price', data.price.toString());
    if (data.location) formData.append('location', data.location);
    if (data.type) formData.append('type', data.type);

    if (images) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await api.put<ApiResponse<Property>>(
      `/properties/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  // Delete property
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{ message: string }>>(
      `/properties/${id}`
    );
    return response.data.data;
  },
};
