import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: Request) {
  try {
    // Verify authentication
    const { isAuthenticated } = await getKindeServerSession();

    if (!(await isAuthenticated())) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: userId } = await request.json();

    if (!userId) {
      return new NextResponse("Missing id parameter", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
