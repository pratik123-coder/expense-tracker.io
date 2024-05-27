import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from "@/components/ui/skeleton"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export const Route = createFileRoute('/expenses')({
  component: Expenses,
})
async function getAllExpenses(){
    const res = await api.expenses.$get();
    if(!res.ok){
      throw new Error("Failed to fetch total spent")
    }
    const data = await res.json();
    return data;
  }
  
  function Expenses() {
    const {isPending , error, data} = useQuery({
      queryKey: ["get-all-expenses"], 
      queryFn: getAllExpenses,
    });
    if (error) return "An Error Occurred : "+ error.message;

  
    return (
        <div className="p-2 max-w-3xl m-auto">
          <Table>
            <TableCaption>A list of all your expenses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableRow>Catagory</TableRow>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending 
              ? Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className='h-4' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4'/>
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4'/>  
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4'/>  
                  </TableCell>
                </TableRow>
              ))
              :data?.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.title}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </div>
      )}