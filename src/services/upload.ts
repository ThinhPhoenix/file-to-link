import axios, { AxiosResponse } from 'axios';

interface UploadResponse {
  secure_url: string;
}

export const upload = (file: File): Promise<AxiosResponse<UploadResponse>> => {
  const formData = new FormData();
  formData.append('bot_token', import.meta.env.VITE_TOKEN);
  formData.append('chat_id', import.meta.env.VITE_CHAT);
  formData.append('document', file);

  return axios.post<UploadResponse>('https://cdn.thinology.id.vn/send', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
