import { useState } from 'react';
import { formatDateTime } from '../../utils/format';

function Post ({ post, onDelete }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    await onDelete();
    setIsProcessing(false);
  };
  return (
    <div className="text-white bg-gray-600 p-4 rounded-lg relative">
      <h1
        className={`${
          isProcessing ? 'text-gray-500' : 'text-gray-200'
        } text-2xl mr-20 overflow-ellipsis overflow-hidden`}
        title={post.title}
      >
        {post.title}
      </h1>
      <p
        className={`${
          isProcessing ? 'text-gray-500' : 'text-gray-200'
        } whitespace-pre overflow-auto`}
      >
        {post.content}
      </p>
      <p className="text-sm text-right">{formatDateTime(post.createdAt)}</p>

      <div className="absolute right-5 top-3">
        <button
          className="text-red-500 font-bold hover:text-red-700 disabled:text-red-900"
          onClick={handleDelete}
          disabled={isProcessing}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
