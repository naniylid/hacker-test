import React, { useEffect, useState } from 'react';
import { getComments } from '../../api/hackerNewsApi';

interface CommentsProps {
  commentIds: number[];
}

const Comments: React.FC<CommentsProps> = ({ commentIds }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!Array.isArray(commentIds)) {
        return;
      }
      const fetchedComments = await getComments(commentIds);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [commentIds]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className='comment'>
          <p>{comment.text}</p>
          <p>
            <strong>{comment.by}</strong> | Score: {comment.score ? comment.score : 0}
          </p>
          {comment.kids && <Comments commentIds={comment.kids} />}
        </div>
      ))}
    </div>
  );
};

export default Comments;
