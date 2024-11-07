import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      Todo: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra del poder" },
          { description: "Piedra del tiempo" },
          { description: "Piedra de la realidad" },
          { description: "Piedra de espacio" },
        ],
      },
    },
  });
  // await prisma.todo.createMany({
  // 	data: [
  // 		{description:"Piedra del alma", complete: true},
  // 		{description:"Piedra del poder"},
  // 		{description:"Piedra del tiempo"},
  // 		{description:"Piedra de la realidad"},
  // 		{description:"Piedra de espacio"},
  // 	]
  // })
  return NextResponse.json({ message: "Seed Executed" });
}
