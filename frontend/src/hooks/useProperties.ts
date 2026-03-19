import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '../services/propertyService';
import type { Property, CreatePropertyDTO, UpdatePropertyDTO } from '../types/property';

export const useProperties = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['properties', page, limit],
    queryFn: () => propertyService.getAll(page, limit),
  });
};

export const usePropertyDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => id ? propertyService.getById(id) : null,
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, images }: { data: CreatePropertyDTO; images?: File[] }) =>
      propertyService.create(data, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, images }: { id: string; data: UpdatePropertyDTO; images?: File[] }) =>
      propertyService.update(id, data, images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
