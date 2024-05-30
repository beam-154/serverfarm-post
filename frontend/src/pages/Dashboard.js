import React, { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Elements/Loading';
import Error from '../components/Elements/Error';
import PostList from '../components/Posts/PostList';

function Dashboard() {
  const { axiosInstance } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);

  const {
    isPending,
    error: fetchError,
    data: posts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axiosInstance('posts').then((response) => response.data),
  });

  const deleteMutateAsync = useMutation({
    mutationFn: (id) => axiosInstance.delete(`posts/${id}`),
    onError: (error) => {
      setError(error);
    },
  });

  const handleDelete = async (postId) => {
    try {
      await deleteMutateAsync.mutateAsync(postId);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch {
      console.log('Failed to delete post');
    }
  };

  const errorOnPage = error || fetchError;

  return (
    <div className="flex flex-col min-h-full flex-1 mx-auto mt-16 mb-2 overflow-hidden w-2/3 md:w-full md:max-w-4xl">
      {isPending && <Loading />}
      {errorOnPage && <Error error={errorOnPage.message} />}
      {posts && <PostList posts={posts} onDelete={handleDelete} />}
    </div>
  );
}

export default Dashboard;
