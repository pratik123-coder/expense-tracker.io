import { userQueryOpetions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router"
// import { userQueryOpetions } from "@/lib/api"

const Login = () => {
    return (
        <div>
            <h1>you have to Login</h1>
            <a href="/api/login">Login</a>
        </div>
    )
}

const Component = () => {
    const {user} = Route.useRouteContext();
    if(!user){
        return <Login />
    }
    return (
        <Outlet />
    )
}

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({context}) => {
        const queryClient = context.queryClient;

        try {
            const data = await queryClient.fetchQuery(userQueryOpetions)
        //Check if the user is loogged in 
            return data;
        } catch (error) {
            return {user: null};
        }
    },
    component: Component,
  })
  