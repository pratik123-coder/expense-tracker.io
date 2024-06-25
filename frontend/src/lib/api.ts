import { hc } from "hono/client";
import {type ApiRoutes} from "@server/app" ;
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>('/');

export const api = client.api;

async function getCurrentUser(){
    const res = await api.me.$get();
    if(!res.ok){
      throw new Error("Failed to fetch total spent")
    }
    const data = await res.json();
    return data;
} 


// This is a query options object that can be used with useQuery hook to fetch the current user
// It caches the data indefinitely and refetches it only when the user manually refetches it
export const userQueryOpetions = queryOptions({
        queryKey: ["get-current-user"], 
        queryFn: getCurrentUser,
        staleTime: Infinity,
    }
);
