import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";
import { getUserServerSession } from "../auth/actions/auth-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") || "10"); //puedo envolver en Number() y con esto transformo las string o envolver en +()
  const skip = Number(searchParams.get("skip") || "0");
  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Take tiene que ser un numero" },
      { status: 400 }
    );
  }
  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "Skip tiene que ser un numero" },
      { status: 400 }
    );
  }
  const todos = await prisma.todo.findMany({
    take,
    skip,
  });
  return NextResponse.json({ message: "Succes", todo: todos });
}

const postSchema = yup.object({
  description: yup.string().required("La descripcion es obligatoria"),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserServerSession();
  if (!user || user === undefined) {
    return NextResponse.json("No autorizado", { status: 401 });
  }
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });
    return NextResponse.json(todo);
  } catch (error: any) {
    return NextResponse.json(error.errors, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const deleteTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    if (!deleteTodos)
      return NextResponse.json(
        { message: "No se pudo borrar los todos" },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "Todos eliminados correctamente", deleteTodos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
