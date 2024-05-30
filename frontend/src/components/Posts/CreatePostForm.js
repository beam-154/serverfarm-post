import { useState } from 'react';
import { useForm } from 'react-hook-form';

function CreatePostForm({ createPost }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();
  const [postStatus, setPostStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      await createPost({ title: data.title, content: data.Content });
      resetForm();
      setPostStatus({ success: true, message: 'Post created successfully' });
    } catch (error) {
      setPostStatus({ success: false, message: 'Post creation failed.' });
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10 sm:m-auto sm:w-full sm:max-w-xl bg-gray-700 p-4 rounded-lg">
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {postStatus &&
          (!postStatus.success ? (
            <span className="notif-error">{postStatus.message}</span>
          ) : (
            <span className="notif-success">{postStatus.message}</span>
          ))}

        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          Title
        </label>
        <input
          type="title"
          {...register('title', { required: true })}
          className="form-input"
        />
        {errors.title && (
          <span className="form-error">Post title is required</span>
        )}

        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          Content
        </label>
        <textarea
          type="Content"
          {...register('Content', { required: true })}
          className="form-input h-[12rem]"
        />
        {errors.content && (
          <span className="form-error">Content is required</span>
        )}

        <button type="submit" className="form-button">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
