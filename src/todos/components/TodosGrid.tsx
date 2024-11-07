"use client"

import { Todo } from "@prisma/client"
import { TodosItem } from "./TodosItem"
// import * as api from '@/todos/helpers/todos'
import { useRouter } from "next/navigation"
import { toggleTodo } from "../actions/todos-actions"

interface Props {
  todos?:Todo[]
}
export const TodosGrid = ({todos = []}:Props) => {
  const router = useRouter()
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const todo = await api.updateTodo(id,complete);
  //   router.refresh()
  //   console.log(todo)
  // }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
     {
      todos.map((todo,index) => (
        <TodosItem key={index} todo={todo} toggleTodo={toggleTodo}/>
      ))
     }
    </div>
  )
}
