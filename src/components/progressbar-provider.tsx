"use client"
import { AppProgressProvider as ProgressProvider } from "@bprogress/next"

export const ProgressbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ProgressProvider
      height="4px"
      color="#3b82f6"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
