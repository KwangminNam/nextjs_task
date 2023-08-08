import { FieldValues } from 'react-hook-form';
import axios from "axios";

interface CommentTypes {
  postId:number;
  content:string;
  id:number;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  comment: CommentTypes[];
}

interface CommentslistTypes {
  id: number;
  postId: number;
  content: string;
}

export function apiModules() {
  //Generate API URL
  const API_URL = axios.create({
    baseURL: 'http://localhost:3001'
  })

  // Get all post
  async function getData(): Promise<PostType[]> {
    const response = await API_URL.get('/posts');
    const data: PostType[] = await response.data;
    return data;
  }

  // Get all comments
  async function getComment(): Promise<CommentslistTypes[]> {
    const response = await API_URL.get('/comments');
    const data: CommentslistTypes[] = await response.data;
    return data;
  }

  // Create post
  function postData(data: FieldValues) {
    return API_URL.post('/posts', data);
  }

  // Create comment
  function postCommentData(data: FieldValues) {
    return API_URL.post('/comments', data);
  }

  // Edit post
  function editData(data: FieldValues, id: number | undefined) {
    return API_URL.put(`/posts/${id}`, data)
  }

  // Edit comment
  function editCommentData(data: FieldValues, id: number | undefined) {
    return API_URL.put(`/comments/${id}`, data);
  }

  // Remove post
  function deleteData(id: number) {
    return API_URL.delete(`/posts/${id}`);
  };

  // Remove comment
  function deleteCommentData(id: number) {
    return API_URL.delete(`/comments/${id}`);
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

