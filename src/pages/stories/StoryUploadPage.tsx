import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import { STORY_FORMATS, STORY_GENRES } from '@/utils/constants'
import mediaService from '@/api/media'
import storiesService from '@/api/stories'

const formatOptions = STORY_FORMATS.map((f) => ({ label: f.replace('_', ' '), value: f }))
const genreOptions = STORY_GENRES.map((g) => ({ label: g, value: g }))

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
})

type UploadForm = z.infer<typeof uploadSchema>

export default function StoryUploadPage() {
  const navigate = useNavigate()
  const [format, setFormat] = useState('')
  const [primaryGenre, setPrimaryGenre] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
  })

  const title = watch('title', '')
  const slug = toSlug(title)

  const handleCoverChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }, [])

  const onSubmit = async (data: UploadForm) => {
    if (!format) {
      toast.error('Please select a format')
      return
    }

    if (!slug) {
      toast.error('Title must produce a valid slug')
      return
    }

    setIsSubmitting(true)

    try {
      let coverImageUrl: string | undefined
      let thumbnailImageUrl: string | undefined

      if (coverFile) {
        const uploadRes = await mediaService.upload(coverFile, 'COVER')
        coverImageUrl = uploadRes.data.secureUrl
        thumbnailImageUrl = uploadRes.data.thumbnailUrl
      }

      await storiesService.create({
        title: data.title,
        slug,
        description: data.description,
        format: format as 'NOVEL' | 'COMIC',
        primaryGenre: primaryGenre || undefined,
        coverImageUrl,
        thumbnailImageUrl,
      })

      toast.success('Story created successfully')
      navigate('/stories')
    } catch {
      // Error toast is handled by axios interceptor
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Stories', href: '/stories' }, { label: 'Upload Story' }]} />

      <div className="max-w-3xl">
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload New Story</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Title" placeholder="Enter story title" error={errors.title?.message} {...register('title')} />

            {slug && (
              <p className="text-xs text-gray-400 -mt-3">
                Slug: <span className="font-mono">{slug}</span>
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Select label="Format" options={formatOptions} value={format} onChange={setFormat} placeholder="Select format..." />
              <Select
                label="Genre"
                options={genreOptions}
                value={primaryGenre}
                onChange={setPrimaryGenre}
                placeholder="Select genre..."
                searchable
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Write a brief description..."
              rows={5}
              error={errors.description?.message}
              {...register('description')}
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
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 10MB</p>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="outline" icon="save" disabled={isSubmitting}>
                Save Draft
              </Button>
              <Button type="submit" icon="send" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Submit for Review'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
