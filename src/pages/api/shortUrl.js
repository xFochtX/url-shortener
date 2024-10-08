import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { url } = req.body;
  try {
    // Buscar si ya existe una entrada con la misma URL
    let link = await prisma.link.findUnique({
      where: { url },
    });

    if (!link) {
      // Si no existe, crea un nuevo enlace acortado
      const randomCode = Math.random().toString(36).substr(2, 5);
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      // Asegurarse de que baseURL termine con una barra "/"
      const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
      const shortUrl = `${baseURL}/${randomCode}`;
      link = await prisma.link.create({
        data: { url, shortUrl },
      });
    }
    return res.status(200).send(link);
    } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
