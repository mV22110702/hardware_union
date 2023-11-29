import { useCallback, useState } from 'react';
import { CommentEntityT } from '~/libs/slices/comments/types/comment-entity.type.ts';
import { CommentFormData } from '~/libs/components/comment-form/comment-form.tsx';
import { getRandomAvatarSource } from '~/libs/helpers/get-random-avatar-source.helper.ts';
import { toast } from 'react-toastify';

export const useComments = () => {
  const [comments, setComments] = useState<CommentEntityT[]>([]);


  const handleCommentSubmit = useCallback(
    (formData: CommentFormData) => {
      setComments((prevState) => [
        ...prevState,
        {
          id: crypto.randomUUID(),
          date: new Date(),
          author: {
            avatarURL: getRandomAvatarSource(),
            username: formData.username,
          },
          content: formData.content,
          title: formData.title,
        },
      ]);
      toast.success('Comment has been added!');
      console.log(`Comment: ${formData.content}`);
    },
    [setComments],
  );

  return {
    comments,
    handleCommentSubmit,
  };
};
