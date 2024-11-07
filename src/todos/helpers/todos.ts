import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };
  const todoDb = fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
  console.log({ todoDb });
  return todoDb;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };
  const todoDb = fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
  console.log({ todoDb });
  return todoDb;
};

export const deleteTodo = async ():Promise<Todo> => {
	const todosDelete = fetch('/api/todos',{
		method:"DELETE",
		headers:{
			"Content-type":"application/json"
		}
	}).then((res) => res.json())
	return todosDelete
}