import axios, { AxiosRequestConfig } from "axios";

type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const fetcher = async (
  method: HTTP_METHOD,
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    ...(method === 'GET' || method === 'DELETE'
      ? { params }
      : { data: params }),
    headers: {
      ...(headers ?? {}),
    },
    withCredentials: true,
  };

  try {
    const res = await axios.request(config);
    return res.data;
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      error: error.message || 'Unknown error',
      details: error.response?.data,
    };
  }
};


export const generateChatAxios = async (message:string, userId:string) => {
  try {
    const res = await fetcher(
      'GET',
      '/api/chatai/chat',
    )
    return res?.data;
  } catch (error) {
    return {
      status: 500,
      error: error
    }
  }
}

// export const getCurrentUserAxios = async () => {
//   try {
//     const res = await fetcher(
//       'GET',
//       '/api/chatai/auth/me',
//     )
//     return res?.data;
//   } catch (error) {
//     return {
//       status: 500,
//       error: error
//     }
//   }
// }