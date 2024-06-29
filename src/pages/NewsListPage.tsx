import React, { useState } from 'react';
import NewsFeed from '../components/NewFeed/index';

const NewsListPage: React.FC = () => {
  const [type, setType] = useState<'beststories' | 'newstories' | 'topstories'>('newstories');

  return (
    <section className='news-list-page'>
      <ul className='news-list-page__sort'>
        <li>
          <button
            onClick={() => {
              setType('newstories');
            }}
          >
            New Stories
          </button>
        </li>
        <li>
          {' '}
          <button
            onClick={() => {
              setType('topstories');
            }}
          >
            Top Stories
          </button>
        </li>
        <li>
          {' '}
          <button
            onClick={() => {
              setType('beststories');
            }}
          >
            Best Stories
          </button>
        </li>
      </ul>

      <NewsFeed type={type} />
    </section>
  );
};

export default NewsListPage;
