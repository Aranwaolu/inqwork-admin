import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import storiesService, { type StoryQueryParams } from '@/api/stories'
import toast from 'react-hot-toast'

export function useStories(params?: StoryQueryParams) {
  return useQuery({
    queryKey: ['admin-stories', params],
    queryFn: () => storiesService.getAll(params).then(r => r.data),
  })
}

export function useStory(slug: string) {
  return useQuery({
    queryKey: ['admin-story', slug],
    queryFn: () => storiesService.getBySlug(slug).then(r => r.data),
    enabled: !!slug,
  })
}

export function useEpisodes(slug: string) {
  return useQuery({
    queryKey: ['admin-episodes', slug],
    queryFn: () => storiesService.getEpisodes(slug).then(r => r.data),
    enabled: !!slug,
  })
}

export function usePublishStory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => storiesService.publish(slug),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-stories'] })
      qc.invalidateQueries({ queryKey: ['admin-story'] })
      toast.success('Story published')
    },
    onError: () => toast.error('Failed to publish story'),
  })
}

export function useArchiveStory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => storiesService.archive(slug),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-stories'] })
      qc.invalidateQueries({ queryKey: ['admin-story'] })
      toast.success('Story archived')
    },
    onError: () => toast.error('Failed to archive story'),
  })
}
