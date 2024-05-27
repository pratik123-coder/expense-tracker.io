import { Hono } from "hono";
import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

//Fake Database
const fakeExpenses: Expense[] = [
    { id: 1, title: "Car Insurance", amount: 294.67, date: new Date()},
    { id: 2, title: "Rent", amount: 1000 ,date: new Date()},
    { id: 3, title: "Groceries", amount: 200 ,date: new Date()},
];

//Code for the schema

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive(),
    date: z.date(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({id:true})

//Route Logic

export const expensesRoute = new Hono()
.get('/',(c)=>{
    return c.json({expenses:fakeExpenses})
})

.get('/:id{[0-9]+}',(c)=>{
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if(!expense) return c.notFound();
    return c.json({expense})
})

.get('/total-spent',async(c)=>{
    await new Promise((r)=>{setTimeout(r,2000)})
    const totalSpent = fakeExpenses.reduce((acc,expense)=>acc+expense.amount,0)
    return c.json({totalSpent})
})

.post('/',zValidator("json",createPostSchema) ,async (c)=>{
    const expense = await c.req.valid("json")
    fakeExpenses.push({...expense,id:fakeExpenses.length+1})
    c.status(201)
    return c.json({expense})
})


.delete('/:id{[0-9]+}',(c)=>{
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.findIndex(expense => expense.id === id+1)
    if(!expense) return c.notFound();
    //delete expene 
    const deletedExpense = fakeExpenses.splice(expense,1)[0];
    console.log(fakeExpenses)
    return c.json({deletedExpense});
})
.put('/',(c)=>{
    return c.json({})
})