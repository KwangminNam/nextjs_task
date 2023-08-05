'use client';

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getData } from "../utils/getData";
import Link from "next/link";


export default function MainList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getData
  });
  return (
    <main>
      <ul>
        {data?.map((item)=>(
          <li>
            <Link href={`/post/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
