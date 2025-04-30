import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { QuizModel } from "@/models/quizModel";

export const GET = async () => {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectDb();
    const tasks = await QuizModel.find({ userId });
    return NextResponse.json({ tasks });
};