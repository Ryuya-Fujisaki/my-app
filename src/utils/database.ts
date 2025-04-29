/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

export const connectDb = async () => {
    try {
await mongoose.connect(process.env.DB_URI || '')
    } catch (error) {
        console.log('DB接続に失敗しました');
        throw new Error();
    }
}