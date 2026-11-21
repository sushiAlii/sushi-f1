import { createFileRoute } from '@tanstack/react-router'
import { WeekendPage } from '../../components/WeekendPage'

export const Route = createFileRoute('/races/$round')({
  params: {
    parse: ({ round }) => ({ round: Number(round) }),
    stringify: ({ round }) => ({ round: String(round) }),
  },
  component: WeekendRoute,
})

function WeekendRoute() {
  const { round } = Route.useParams()

  return <WeekendPage round={round} />
}
