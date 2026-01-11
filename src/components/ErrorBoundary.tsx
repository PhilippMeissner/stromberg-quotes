import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-screen p-10 md:p-20 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-2xl md:text-4xl mb-4">Hoppla!</h1>
          <p className="text-gray-300 mb-6">
            Da ist wohl was schief gelaufen. Bernd hätte gesagt: "Das Leben ist kein Ponyhof."
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
