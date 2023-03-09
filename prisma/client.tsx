// update ~2:03:33 in reference
// import { PrismaClient } from '@prisma/client'

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

// export default client


import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
