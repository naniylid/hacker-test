import React, { useState, useEffect, useRef } from 'react';
import { getStories } from '../../api/hackerNewsApi';
import NewsItem from '../NewsItem/index';

interface NewsFeedProps {
  type: 'beststories' | 'newstories' | 'topstories';
}

const NewsFeed: React.FC<NewsFeedProps> = ({ type }) => {
  const [stories, setStories] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const limit = 30;
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const newStories = await getStories(type, page, limit);
      setStories(newStories);
    };
    fetchStories();
  }, [type]);

  useEffect(() => {
    const fetchMoreStories = async () => {
      if (page > 0) {
        const moreStories = await getStories(type, page, limit);
        setStories((prevStories) => [...prevStories, ...moreStories]);
      }
    };
    fetchMoreStories();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <>
      {stories.length > 0 ? (
        <div className='news-feed'>
          {stories.map((story) => (
            <NewsItem key={story.id} story={story} />
          ))}
          <button
            className='news-feed__button'
            ref={loadMoreRef}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load more
          </button>
        </div>
      ) : (
        <h3>Загрузка...</h3>
      )}
    </>
  );
};

export default NewsFeed;
