import {PrismaClient} from "@prisma/client";

export default function ShortIdPage(){
  return <div>ShortID Redirect</div>;
}

export async function getServerSideProps({params}){
  const prisma = new PrismaClient();
  const {shortId} = params;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // Asegurarse de que baseURL termine con una barra "/"
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
  const baseURL_shortId = `${baseURL}/${shortId}`;

  const data = await prisma.link.findUnique({  
    // where: {shortUrl: shortId},
    where: {shortUrl: baseURL_shortId},
  });

  if(!data){
    return {redirect: {destination: "/"}};
  }

  return{
    redirect: {destination: data.url},
  }
}