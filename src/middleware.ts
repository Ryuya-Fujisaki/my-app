import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: ['/((?!_next|.*\\..*).*)', '/', '/(api|trpc)(.*)'], //認証が必要なパスを指定
};