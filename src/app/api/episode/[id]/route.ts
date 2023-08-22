import { useFetch } from '@/fetcher/useFetch';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  const { id } = context.params;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, status } = await useFetch(`https://otakudesu.lol/episode/${id}`);

    if (status !== 200) throw new Error(`Error ${status}`);

    const $ = cheerio.load(data);
    const link = $('#pembed > div > iframe').attr('src');
    const title = $('#venkonten > div.venser > div.venutama > h1').text().trim();
    // const shortlink = $('head > link');

    // let a = shortlink
    //   .map((_i, el) => {
    //     const value = $(el).attr('href');
    //     if (value?.includes('https://otakudesu.lol/?p=')) return value.replace('https://otakudesu.lol/?p=', '');
    //   })
    //   .get();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const ha = await useFetch(`https://otakudesu.lol/wp-admin/admin-ajax.php`, 'POST', {
    //   id: Number(a[0]),
    //   i: 1,
    //   q: 'a',
    // });

    return NextResponse.json({ status: 200, succes: true, data: { title, link } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
};
