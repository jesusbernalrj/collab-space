export default function BoardPage({ params }: { params: { boardId: string } }) {
    // Convert boardId to a readable title
    const boardTitle = params.boardId
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
  
  