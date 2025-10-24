import React from 'react'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Unhandled error caught by ErrorBoundary:', error, info)
    }

    handleRetry = () => this.setState({ hasError: false, error: undefined })

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6">
                    <h2 className="text-2xl font-semibold text-red-600 mb-3">Something went wrong</h2>
                    <p className="text-sm text-gray-600 mb-4">{this.state.error?.message}</p>
                    <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
                    >
                        Retry
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
