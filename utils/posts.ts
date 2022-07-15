import axios from 'axios';

export const getMarkDownFile = async (url: string) => {
  return await axios
    .get(url, {
      headers: {
        // Authorization: process.env.GITHUB_AUTH_TOKEN, ??
        Accept: 'application/vnd.github+json',
      },
    })
    .then(({ data }) => data);
};

export const calcReadingTime = (size: number) => {
  const wpm = 180;
  const word_length = 5;
  const words = size / word_length;
  const words_time = words / wpm;
  const bonus = 1;
  return Math.floor(words_time + bonus);
};
