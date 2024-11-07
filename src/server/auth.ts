import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "@/app/api/auth/actions/auth-actions";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google,
    Credentials({
       credentials: {
        email: {label:"correo",type:"email", placeholder:"usuario@usuario.com"},
        password: {label:"contraseña", type:"password",placeholder:"*****"},
      },
      authorize: async (credentials) => {

        // logic to salt and hash password
 
        // logic to verify if the user exists
        const user = await signInEmailPassword(credentials.email as string, credentials.password as string)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt'
  // },
  // callbacks: {
  //   async signIn({user, account, profile, email, credentials}){
  //     return true
  //   },
  //   //deben ejecutarse en este orden
  //   async jwt({token, user, account, profile}){
  //     const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'no-email'}});
  //     token.role = dbUser?.roles ?? ['no-role'];
  //     token.id = dbUser?.id ?? 'no-uuid'
  //     return token
  //   },

  //   async session({session, token, user}){
  //     if(session && session.user){
  //      session.user.id = token.id;
  //      session.user.roles = token.role
  //     }
  //     console.log({token})

  //     return session 
  //   }
  // }
})