import prisma from "@/lib/prisma";
import { privateRoute } from "@/lib/privateRoute";
import { NextResponse } from "next/server";

export const GET = privateRoute(async (req) => {
  try {
    const listingTypes = await prisma.listingType.findMany({
      orderBy: {
        name: "asc",
      },
    });
    
    return NextResponse.json(listingTypes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error retrieving listing types" }, { status: 500 });
  }
});