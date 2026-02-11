
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-base)] p-8">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">Something went wrong</h2>
            <p className="text-[var(--text-secondary)] mb-6">The spirit needs a moment to recover.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-[var(--accent)] text-[var(--text-inverse)] rounded-2xl font-bold"
              style={{ boxShadow: 'var(--shadow-accent)' }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
