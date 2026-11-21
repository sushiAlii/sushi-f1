import { createFileRoute } from '@tanstack/react-router'
import { RaceCalendar } from '../../components/RaceCalendar'

export const Route = createFileRoute('/races/')({
  component: RaceCalendar,
})
