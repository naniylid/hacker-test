import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments/index';
import './NewItem.module.scss';

interface NewsItemProps {
  story: any;
}

const NewsItem: React.FC<NewsItemProps> = ({ story }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className='news-item'>
      <h2>{story.title}</h2>
      <div className='news-item__wrapper'>
        <Link to={story.url} target='_blank' rel='noopener noreferrer'>
          Read More
        </Link>
        <p>Score: {story.score}</p>
        <p>By: {story.by}</p>
        <button onClick={toggleComments}>{showComments ? 'Hide сomments' : 'Show сomments'}</button>
      </div>

      {showComments &&
        (story.kids ? <Comments commentIds={story.kids} /> : <p>Нет комментариев</p>)}
    </div>
  );
};

export default NewsItem;
