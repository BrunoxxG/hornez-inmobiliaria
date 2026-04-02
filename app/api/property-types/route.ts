import prisma from "@/lib/prisma";
import { privateRoute } from "@/lib/privateRoute";
import { NextResponse } from "next/server";

export const GET = privateRoute(async (req) => {
  try {
    const propertyTypes = await prisma.propertyType.findMany({
      orderBy: {
        name: "asc",
      },
    });
    
    return NextResponse.json(propertyTypes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error retrieving property types" }, { status: 500 });
  }
});