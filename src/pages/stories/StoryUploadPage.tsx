import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useCallback } from 'react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import { STORY_TYPES, STORY_GENRES } from '@/utils/constants'

const typeOptions = STORY_TYPES.map((t) => ({ label: t.replace('_', ' '), value: t }))
const genreOptions = STORY_GENRES.map((g) => ({ label: g, value: g }))

const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  synopsis: z.string().min(10, 'Synopsis must be at least 10 characters').max(2000),
  tags: z.string(),
})

type UploadForm = z.infer<typeof uploadSchema>

export default function StoryUploadPage() {
  const [type, setType] = useState('')
  const [genre, setGenre] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
  })

  const handleCoverChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
    }
  }, [])

  const onSubmit = (_data: UploadForm) => {
    // Will be connected to API
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Stories', href: '/stories' }, { label: 'Upload Story' }]} />

      <div className="max-w-3xl">
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload New Story</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Title" placeholder="Enter story title" error={errors.title?.message} {...register('title')} />

            <div className="grid grid-cols-2 gap-4">
              <Select label="Type" options={typeOptions} value={type} onChange={setType} placeholder="Select type..." />
              <Select
                label="Genre"
                options={genreOptions}
                value={genre}
                onChange={setGenre}
                placeholder="Select genre..."
                searchable
              />
            </div>

            <Textarea
              label="Synopsis"
              placeholder="Write a brief synopsis..."
              rows={5}
              error={errors.synopsis?.message}
              {...register('synopsis')}
            />

            <Input
              label="Tags"
              placeholder="fantasy, adventure, magic (comma separated)"
              error={errors.tags?.message}
              {...register('tags')}
            />

            {/* Cover Image Dropzone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 cursor-pointer hover:border-brand hover:bg-brand-light/30 transition">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover preview" className="h-40 rounded-lg object-cover mb-3" />
                ) : (
                  <>
                    <GoogleMaterialIcon name="cloud_upload" size={48} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload cover image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="outline" icon="save">
                Save Draft
              </Button>
              <Button type="submit" icon="send">
                Submit for Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
