import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute,useNavigate } from '@tanstack/react-router'

// ShadCn Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// TanStack Form
import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      date: new Date(),
    },
    onSubmit: async ({ value }) => {
      const data = {
        ...value,
        amount: Number(value.amount),
      }
      // Do something with form data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await api.expenses.$post({json:data});
      if(!res.ok) {
        throw new Error('Failed to create expense')
      }
      navigate({to: '/expenses'})
    },
  })

  const categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Education', 'Other']

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-2 max-w-xl w-full">
        <h2 className='text-center'>Create a new expense</h2>

        <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
          className="m-auto">

          <form.Field
            name="title"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />

          <form.Field
            name="amount"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />

          <form.Field
            name="category"
            children={(field) => (
              <>
              <div className='flex items-center justify-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className='m-3'>
                      {field.state.value || 'Select a category'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} onSelect={() => field.handleChange(category)}>
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className='flex items-center justify-center'>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  )
}
