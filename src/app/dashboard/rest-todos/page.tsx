import { getUserServerSession } from "@/app/api/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Lista de Todos",
  description: "Lista de Todos",
};
export default async function RestTodosPage() {
  const user = await getUserServerSession(); 
  //!nota: este redireccionamiento no deberia ir aqui
  if(!user){
    redirect('/')
  }
  const todos = await prisma.todo.findMany({ 
    where:{userId:user?.id},
    orderBy: { description: "asc" } });
  return (
    <div>
      <div className="w-full px-4 mx-4 mb-4">
      <NewTodo/>
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
