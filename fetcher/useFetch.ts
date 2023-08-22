import axios from 'axios';
import https from 'https';

interface Payload {
  id: number;
  i: number;
  q: string;
  nonce?: 'b27b5f0c46';
  action?: '2a3505c93b0035d3f455df82bf976b84';
}

export const useFetch = async (url: string, method: string = 'GET', data?: Payload) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    if (method === 'POST') {
      const from = new FormData();
      from.append('id', String(data?.id));
      from.append('i', String(data?.i));
      from.append('q', String(data?.q));
      from.append('nonce', 'b27b5f0c46');
      from.append('action', '2a3505c93b0035d3f455df82bf976b84');

      // console.log(JSON.stringify(from));
      const response = await axios.post(url, from, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending FormData
        },
      });

      console.log(response.status);
      return {
        data: response.data,
        status: response.status,
      };
    }

    const response = await axios.get(url, { method, httpsAgent: agent,headers: {
    'Cache-Control': 'no-cache',
  }, });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
