import mongoose, { Document, model, models } from 'mongoose';

export interface IQuiz extends Document {
    quizId: string;
    question: string;
    choices: string[];
    answer: string;
}

const quizSchema = new mongoose.Schema<IQuiz>({
    quizId: { type: String, required: false },
    question: { type: String, required: true },
    choices: { type: [String], required: true },
    answer: { type: String, required: true },
});

export const QuizModel = models.Quiz || model<IQuiz>("Quiz", quizSchema);