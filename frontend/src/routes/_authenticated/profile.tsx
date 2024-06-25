import { userQueryOpetions} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const {isPending , error, data} = useQuery(userQueryOpetions);

  if(isPending) return "Loading...";
  if (error) return "An Error Occurred : "+ error.message;

  return <div className="p-2">Hello from Profile!
    <p>Hello {data.user.family_name}</p>
    <a href="/api/logout">Logout</a>
  </div>
}
