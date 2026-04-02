import prisma from "@/lib/prisma";
import { privateRoute } from "@/lib/privateRoute";
import { NextResponse } from "next/server";

export const GET = privateRoute(async (req) => {
  try {
    const features = await prisma.feature.findMany({
      orderBy: {
        name: "asc",
      },
    });
    
    return NextResponse.json(features, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error retrieving features" }, { status: 500 });
  }
});