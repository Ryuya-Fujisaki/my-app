/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDb } from '@/utils/database';
import { QuizModel } from '@/models/quizModel';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectDb();
    const quiz = await QuizModel.findById(params.id);
    return Response.json(quiz);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const userAnswer = body.answer;
    const quiz = await QuizModel.findById(params.id);

    const correct = quiz.answer.trim() === userAnswer.trim();
    return Response.json({ correct });
}