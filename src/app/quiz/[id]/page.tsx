/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function QuizPage() {
    const [quiz, setQuiz] = useState<{
        choices: string[]; question: string
    } | null>(null);
    const [answer, setAnswer] = useState('');
    const router = useRouter();
    const params = useParams();
    const quizId = params.id as string;

    const fetchQuiz = async (id: string) => {
        try {
            const res = await fetch(`/api/quiz/${id}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setQuiz(data);
        } catch (err) {
            console.error("Error fetching quiz:", err);
        }
    }

    useEffect(() => {
        if (quizId) fetchQuiz(quizId);
    }, [quizId]);

    const handleSubmit = async () => {
        if (!answer) {
            alert("答えを選んでください");
            return;
        }

        const res = await fetch(`/api/quiz/${quizId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer })
        });

        const result = await res.json();

        if (result.correct) {
            const nextId = parseInt(quizId) + 1;
            router.push(`/quiz/${nextId}`);
        } else {
            alert('不正解です。もう一度試してください。');
        }

        if (quizId === "10") {
            router.push('/');
        }
    };

    if (!quiz) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
            {quiz.choices?.map((choice, index) => (
                <div key={index} className="mb-2">
                    <label>
                        <input
                            type="radio"
                            name="answer"
                            value={choice}
                            checked={answer === choice}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="mr-2"
                        />
                        {choice}
                    </label>
                </div>
            ))}
            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}>
                提出
            </button>
        </div>
    );
}