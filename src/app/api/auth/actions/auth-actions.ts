import prisma from "@/lib/prisma";
import { auth } from "@/server/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const getUserServerSession = async () => {
  const session = await auth()
  if(!session){
    redirect('/')
  }
  if(!session?.user)redirect('/')
 return session.user;
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")){
		 return null
		};
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  });
  return user;
};
