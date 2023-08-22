'use client';
import axios from 'axios';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/episode';

export default function Home() {
  const [episode, setEpisode] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getNewEpisodes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/new');
      setEpisode(data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewEpisodes();
  }, []);

  return (
    <div className="container pt-4 pb-10">
      <h1 className="bg-zinc-900 w-max text-white text-base px-4 py-1 rounded-md my-4">New Release</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : null}
      <div className="flex justify-center flex-wrap gap-4">
        {episode.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} episode={item.episode} />
        ))}
      </div>
    </div>
  );
}
