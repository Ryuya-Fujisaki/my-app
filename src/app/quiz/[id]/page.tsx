/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function QuizPage() {
    const [quiz, setQuiz] = useState<{ question: string } | null>(null);
    const [answer, setAnswer] = useState('');
    const router = useRouter();
    const params = useParams();
    const quizId = params.id as string;

    useEffect(() => {
        if (!quizId) return;
        fetch(`/api/quiz/${quizId}`)
            .then(res => res.json())
            .then(data => setQuiz(data));
    }, [quizId]);

    const handleSubmit = async () => {
        const res = await fetch(`/api/quiz/${quizId}`, {
            method: 'POST',
            body: JSON.stringify({ answer }),
        });
        const result = await res.json();

        if (result.correct) {
            const nextId = parseInt(quizId) + 1;
            router.push(`/quiz/${nextId}`);
        } else {
            alert('不正解です。もう一度試してください。');
        }
    };

    if (!quiz) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
            <input
                className="border px-4 py-2 mr-2"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="ここに解答を入力"
            />
            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}>
                提出
            </button>
        </div>
    );
}