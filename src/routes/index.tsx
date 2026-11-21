import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto max-w-content px-5 py-10">
      <h1 className="font-heading text-4xl">Sushi Paddock</h1>
    </main>
  )
}
