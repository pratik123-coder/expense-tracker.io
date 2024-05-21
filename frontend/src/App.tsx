import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"


function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(()=>{
    async function fetchTotalSpent() {
    const res = await fetch('/api/expenses/total-spent');
    const data = await res.json();
    setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  },[]);

  return (
    <div className="flex justify-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {totalSpent}
      </CardContent>
    </Card>
    </div>
  )
}

export default App
