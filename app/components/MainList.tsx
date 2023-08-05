'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getData } from "../utils/getData";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MainList() {

  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getData
  });
  
  const deletePost = (id:number) => {
    return axios
    .delete(`http://localhost:3001/posts/${id}`)
    .then(()=>{
      router.refresh();
    })
  }

  const removeQuery = useMutation({
    mutationFn: deletePost,
    onSuccess:()=>{
      toast.success('삭제 완료!');
    },
    onError:()=>{
      toast.error('잠시 후 다시 시도해주세요.')
    }
  });

  const removeHandler = async (id:number) => {
    try{
      await removeQuery.mutateAsync(id)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <main>
      <ul>
        {data?.map((item)=>(
          <li>
            <Link href={`/post/${item.id}`}>{item.title}</Link>
            <button onClick={()=>{removeHandler(item.id)}}>DELETE</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
