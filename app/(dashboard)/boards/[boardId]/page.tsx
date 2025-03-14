export default async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  // Await the params since it's now a Promise in Next.js 15
  const resolvedParams = await params

  // Convert boardId to a readable title
  const boardTitle = resolvedParams.boardId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{boardTitle}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Board details and tasks</p>
      </header>
    </>
  )
}

