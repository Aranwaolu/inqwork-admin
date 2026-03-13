import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import featuredService, { type FeaturedQueryParams } from '@/api/featured'
import type { CreateFeaturedDto, UpdateFeaturedDto } from '@/types/featured'
import toast from 'react-hot-toast'

export function useFeaturedPlacements(params?: FeaturedQueryParams) {
  return useQuery({
    queryKey: ['admin-featured', params],
    queryFn: () => featuredService.getAll(params).then(r => r.data),
  })
}

export function useCreateFeatured() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateFeaturedDto) => featuredService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-featured'] })
      toast.success('Featured placement created')
    },
    onError: () => toast.error('Failed to create featured placement'),
  })
}

export function useUpdateFeatured() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFeaturedDto }) =>
      featuredService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-featured'] })
      toast.success('Featured placement updated')
    },
    onError: () => toast.error('Failed to update'),
  })
}

export function useDeleteFeatured() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => featuredService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-featured'] })
      toast.success('Featured placement removed')
    },
    onError: () => toast.error('Failed to remove'),
  })
}
