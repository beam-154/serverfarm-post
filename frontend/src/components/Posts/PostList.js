import Post from './Post';

function PostList({ posts, onDelete }) {
  return (
    <div className="flex flex-col gap-6 p-3 h-full m-4 justify-center">
      {posts.map((post) => (
        <Post key={post._id} post={post} onDelete={() => onDelete(post._id)} />
      ))}
    </div>
  );
}

export default PostList;
