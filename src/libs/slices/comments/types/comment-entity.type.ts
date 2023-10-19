type CommentEntityT = {
  id: string;
  author: {
    username: string;
    avatarURL: string;
  };
  content: string;
  title: string;
  date: Date;
};

export { type CommentEntityT };
