import axios from "axios";

export async function getData(){
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/');
  const data = await response.data;

  return data;
}