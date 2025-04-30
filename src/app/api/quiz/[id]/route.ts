/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import { connectDb } from '@/utils/database';
import { QuizModel } from '@/models/quizModel';

export async function GET(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try { 
    await connectDb();
    const quiz = await QuizModel.findOne({ quizId: params.id });

    if (!quiz) {
        return new Response(JSON.stringify({ error: 'Quiz not found'}), {
            status: 404,
            headers: { 'Content-Type': 'Application/json' },
        });
    }

    return new Response(JSON.stringify(quiz), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
} catch (error) {
    console.error("クイズ取得に失敗:", error);
    return new Response(JSON.stringify({ error: 'Failed to get quiz' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json'},
    });
}
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb();
        const body = await request.json();

        const newQuiz = new QuizModel(body);
        const savedQuiz = await newQuiz.save();

        return new Response(JSON.stringify(savedQuiz), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('クイズの保存に失敗:', error);
        return new Response(JSON.stringify({ error: 'Failed to save quiz' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
