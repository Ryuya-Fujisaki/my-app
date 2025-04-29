import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { userId } = await auth();

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  return (
    <div>
      <h1>ようこそ、{user?.firstName}さん。</h1>
      <UserButton
        afterSignOutUrl="/sign-in"
      />
    </div>
  )
}