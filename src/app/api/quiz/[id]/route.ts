/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import { connectDb } from '@/utils/database';
import { QuizModel } from '@/models/quizModel';

export async function GET(
    request: NextRequest) {
    try { 
    await connectDb();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return new Response(JSON.stringify({ error: "Missing quiz ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const quiz = await QuizModel.findOne({ quizId: id });

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

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing quiz ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { answer } = await request.json(); //ユーザーの回答を取得
        const quiz = await QuizModel.findOne({ quizId: id });

        if (!quiz) {
            return new Response(JSON.stringify({ error: "Quiz not found"}), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        const correct = quiz.answer.trim() === answer.trim();

        return new Response(JSON.stringify({ correct }), {
            status: 200,
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        console.error('解答判定に失敗:', error);
        return new Response(JSON.stringify({ error: 'Failed to check answer' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
