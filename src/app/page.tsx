import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();
  return (
    <div>
      <h1>ようこそ、{user?.firstName}さん。</h1>
      <UserButton
        afterSignOutUrl="/sign-in"
      />
    </div>
  )
}