import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: { 
        id: string;
    }
}

export async function GET(request: Request, {params}:Segments) { 
    const { id } = params;
    const todo = await prisma.todo.findFirst({where: {id}});
    if(!todo) return NextResponse.json({message:"No se encontro el todo"},{status:404})
    return NextResponse.json({message:"hola mundo", todo})
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})
export async function PUT(request: Request, {params}:Segments) { 
    const {id} = params;
  try {
    const todo = await prisma.todo.findFirst({where:{id}});
    if(!todo) return NextResponse.json({message:"No se encontro el todo"},{status:404});

    const {complete, description} = await putSchema.validate(await request.json());

    const updateTodo = await prisma.todo.update({where:{id}, data:{complete, description}})
    return NextResponse.json(updateTodo)
  } catch (error) {
    return NextResponse.json({message:"Hubo un error", error}) 
  }
}