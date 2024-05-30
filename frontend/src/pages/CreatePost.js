import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreatePostForm from '../components/Posts/CreatePostForm';
import { AuthContext } from '../context/AuthContext';

function CreatePost() {
  const { axiosInstance } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const createPost = async (data) => {
    axiosInstance.post('posts', data);
  };

  const { mutateAsync } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return <CreatePostForm createPost={mutateAsync} />;
}

export default CreatePost;
