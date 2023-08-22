'use client';
import Frame from '@/components/Frame';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Episode {
  title: string;
  link: string;
}
const Page = ({ params }: { params: { episodeId: string } }) => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);

  const getEpisode = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/episode/${params.episodeId}`);
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
    getEpisode();
  }, []);

  return (
    <div className="py-10">
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : null}
      <h1>{episode?.title}</h1>
      <div className="flex justify-center">
        <Frame url={episode?.link!} />
      </div>
    </div>
  );
};

export default Page;
