import { FieldValues } from 'react-hook-form';
import axios from "axios";

export interface PostType {
  id: number;
  title: string;
  content: string;
  comment: any[];
}

interface CommentslistTypes {
  id:number;
  postId:number;
  content:string;
}

export function apiModules() {
  const API_URL = axios.create({
    baseURL: 'http://localhost:3001'
  })
  async function getData(): Promise<PostType[]> {
    const response = await API_URL.get('/posts');
    const data: PostType[] = await response.data;
    return data;
  }

  async function getComment(): Promise<CommentslistTypes[]> {
    const response = await API_URL.get('/comments');
    const data: CommentslistTypes[] = await response.data;
    return data;
  }

  function postData(data: FieldValues) {
    return API_URL
      .post('/posts', data);
  }

  function postCommentData(data: FieldValues) {
    return API_URL
      .post('/comments', data);
  }

  function editData(data: FieldValues, id: number | undefined) {
    return API_URL
      .put(`/posts/${id}`, data)
  }

  function editCommentData(data: FieldValues, id:number | undefined) {
    return API_URL
      .put(`/comments/${id}`, data);
  }

  function deleteData(id: number) {
    return API_URL
      .delete(`/posts/${id}`);
  };

  function deleteCommentData(id: number) {
    return API_URL
      .delete(`/comments/${id}`);
  };

  return {
    getData,
    deleteData,
    postData,
    editData,
    postCommentData,
    getComment,
    deleteCommentData,
    editCommentData
  }
}

