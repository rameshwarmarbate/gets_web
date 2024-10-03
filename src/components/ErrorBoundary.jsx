import { Button } from "@mui/material";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
