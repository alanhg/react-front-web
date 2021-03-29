import React from 'react';

class ErrorBoundary extends React.Component<{ children }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <><h1>Oops！Something went wrong, please contact the administrator!</h1>
        <img src={'static/images/error.svg'} style={{ width: '40%' }} />
      </>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
