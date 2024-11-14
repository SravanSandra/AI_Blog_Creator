'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const publishSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type PublishFormData = z.infer<typeof publishSchema>;

export default function PublishPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublishFormData>({
    resolver: zodResolver(publishSchema),
  });

  const onSubmit = (data: PublishFormData) => {
    // Handle form submission, e.g., send data to an API route
    console.log(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Publish Content</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register('title')}
            className="border p-2 w-full"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            {...register('content')}
            className="border p-2 w-full"
            placeholder="Enter content"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
