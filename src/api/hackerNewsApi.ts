const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getStories = async (type: string, page: number, limit: number) => {
  const response = await fetch(`${BASE_URL}/${type}.json`);
  const storyIds = await response.json();
  const storyIdsPage = storyIds.slice(page * limit, (page + 1) * limit);
  const storyPromises = storyIdsPage.map((id: number) =>
    fetch(`${BASE_URL}/item/${id}.json`).then((res) => res.json()),
  );
  const stories = await Promise.all(storyPromises);
  return stories;
};

export const getStory = async (id: number) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  const data = await response.json();
  return data;
};

export const getComments = async (ids: number[]) => {
  if (!Array.isArray(ids)) {
    return [];
  }
  const commentPromises = ids.map((id) =>
    fetch(`${BASE_URL}/item/${id}.json`).then((res) => res.json()),
  );
  const comments = await Promise.all(commentPromises);
  return comments;
};
