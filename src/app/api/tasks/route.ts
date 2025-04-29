import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import TaskModel from "@/models/task";

export const GET = async () => {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectDb();
    const tasks = await TaskModel.find({ userId });
    return NextResponse.json({ tasks });
};