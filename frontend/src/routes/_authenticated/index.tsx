import { createFileRoute } from '@tanstack/react-router'


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {api} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})


async function getTotalSpent(){
  const res = await api.expenses["total-spent"].$get();
  if(!res.ok){
    throw new Error("Failed to fetch total spent")
  }
  const data = await res.json();
  return data;
}

function Index() {
  const {isPending , error, data} = useQuery({
    queryKey: ["get-total-spent"], 
    queryFn: getTotalSpent,
  });
  if (error) return "An Error Occurred : "+ error.message;

  return (
    <div className="flex justify-center w-full my-auto">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? "..." : data.totalSpent}
      </CardContent>
    </Card>
    </div>
  )
}



