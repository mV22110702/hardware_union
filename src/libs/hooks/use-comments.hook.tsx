import { ChangeEventHandler, useCallback, useState } from 'react';
import { CommentEntityT } from '~/libs/slices/comments/types/comment-entity.type.ts';
import { CommentFormData } from '~/libs/components/comment-form/comment-form.tsx';
import { getRandomAvatarSource } from '~/libs/helpers/get-random-avatar-source.helper.ts';
import { toast } from 'react-toastify';

export const useComments = () => {
  const [commentContent, setCommentContent] = useState<string>('');

  const [comments, setComments] = useState<CommentEntityT[]>([]);

  const handleCommentContentChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (event) => {
      setCommentContent(event.target.value);
    },
    [setCommentContent],
  );

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
          content: commentContent,
          title: formData.title,
        },
      ]);
      toast.success('Comment has been added!');
      console.log(`Comment: ${commentContent}`);
    },
    [setComments, comments, commentContent],
  );

  return {
    commentContent,
    comments,
    handleCommentSubmit,
    handleCommentContentChange,
  };
};
