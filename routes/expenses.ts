import { Hono } from "hono";
import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

type Expense = {
    id: string;
    title: string;
    amount: number;
};

const fakeExpenses: Expense[] = [
    { id: "1", title: "Car Insurance", amount: 294.67 },
    { id: "2", title: "Rent", amount: 1000 },
    { id: "3", title: "Groceries", amount: 200 },
];

const createPostSchema = z.object({
    title: z.string().min(3).max(100),
    amount: z.number().int().positive(),
});

export const expensesRoute = new Hono()
.get('/',(c)=>{
    return c.json({expenses:fakeExpenses})
})


.get('/:id{[0-9]+}',(c)=>{
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.find(expense => expense.id === id+"")
    if(!expense) return c.notFound();
    return c.json({expense})
})


.post('/',zValidator("json",createPostSchema) ,async (c)=>{
    const expense = await c.req.valid("json")
    fakeExpenses.push({...expense,id:fakeExpenses.length+1+""})
    return c.json({expense})
})


.delete('/',(c)=>{
    return c.json({})
})
.put('/',(c)=>{
    return c.json({})
})