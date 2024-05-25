import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import {Button} from "@/components/ui/button";

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})


function CreateExpense() {
  return (
  <div className="p-2"><h2 className='text-center'>Create a new expense</h2>
    <form className="max-w-xl m-auto">
      <Label htmlFor="email">Title</Label>
      <Input type="text" id="title" placeholder="Title" />
      <Label htmlFor="amount">Amount</Label>
      <Input type="number" id="amount" placeholder="Amount" />
      <Button className='mt-4' type="submit">Create Expense</Button>
    </form>
  </div>
    )
}