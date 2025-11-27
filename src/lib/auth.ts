import { betterAuth } from "@better-auth/core"
import { prismaAdapter } from "@better-auth/adapters/prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
       
    }),
    emailAndPassword: {
        enabled: true,
    },
})