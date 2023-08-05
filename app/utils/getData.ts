import axios from "axios";

interface PostType {
  id:number;
  title:string;
  content:string;
  comment:any[];
}

export async function getData():Promise<PostType[]>{
  const response = await axios.get('http://localhost:3001/posts');
  const data:PostType[] = await response.data;

  return data;
}