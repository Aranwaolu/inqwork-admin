import React from 'react'
import Button from '@/components/ui/Button'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface">
          <div className="rounded-full bg-red-100 p-4">
            <GoogleMaterialIcon name="error" size={48} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
          <p className="text-sm text-gray-500">An unexpected error occurred. Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      )
    }

    return this.props.children
  }
}
