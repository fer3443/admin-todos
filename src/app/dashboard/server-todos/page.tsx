import { getUserServerSession } from "@/app/api/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { auth } from "@/server/auth";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Lista de Todos",
  description: "Lista de Todos",
};
export default async function ServerTodosPage() {
  // const session = await auth()
  // if(!session){
  //   redirect('/api/auth/signin')
  // }
  const user = await getUserServerSession(); 
  if(!user){
    redirect('/')
  }
  // //!nota: este redireccionamiento no deberia ir aqui

  const todos = await prisma.todo.findMany({ 
    where:{userId:user?.id},
    orderBy: { description: "asc" } });
  return (
    <div>
      <span className="text-3xl w-full mb-6 mx-auto">Server Actions</span>
      <div className="w-full px-4 mx-4 mb-4">
      <NewTodo/>
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
