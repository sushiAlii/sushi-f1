import { StatusMessage } from './StatusMessage'

interface RetryMessageProps {
  title: string
  onRetry: () => void
}

export function RetryMessage({ title, onRetry }: RetryMessageProps) {
  return (
    <StatusMessage
      title={title}
      body="The F1 data service didn’t respond."
      action={
        <button
          type="button"
          onClick={onRetry}
          className="rounded-pill bg-salmon px-5 py-2.5 text-sm font-bold text-nori"
        >
          Try again
        </button>
      }
    />
  )
}
