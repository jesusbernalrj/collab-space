import { PrismaClient } from "@prisma/client"

// Función para transformar la URL de conexión de Prisma
function getPrismaUrl() {
  const baseUrl = process.env.POSTGRES_PRISMA_URL || "";
  
  // Si ya tiene parámetros de consulta
  if (baseUrl.includes("?")) {
    // Si ya tiene pgbouncer, asegúrate de que sea true
    if (baseUrl.includes("pgbouncer=false")) {
      return baseUrl.replace("pgbouncer=false", "pgbouncer=true") + "&connection_limit=1";
    } 
    // Si no tiene pgbouncer, añádelo junto con connection_limit
    else if (!baseUrl.includes("pgbouncer=")) {
      return baseUrl + "&pgbouncer=true&connection_limit=1";
    }
    // Si ya tiene pgbouncer=true, solo añade connection_limit si no existe
    else if (!baseUrl.includes("connection_limit=")) {
      return baseUrl + "&connection_limit=1";
    }
    return baseUrl; // Ya tiene todo lo que necesitamos
  } 
  // Si no tiene parámetros de consulta
  else {
    return baseUrl + "?pgbouncer=true&connection_limit=1";
  }
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"], // Reducido para mejorar el rendimiento
    datasources: {
      db: {
        url: getPrismaUrl()
      }
    }
  })

// Middleware para manejar errores de prepared statement
prisma.$use(async (params, next) => {
  try {
    return await next(params)
  } catch (error: any) {
    // Si es un error de prepared statement, intentar una vez más
    if (error.message && error.message.includes('prepared statement')) {
      console.log('Reintentando operación de Prisma después de error de prepared statement')
      
      // Esperar un momento antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 100))
      
      return await next(params)
    }
    throw error
  }
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma