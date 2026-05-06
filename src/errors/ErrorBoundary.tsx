import { Box } from '@mui/material';
import React from 'react';
import { ErrorBoundaryMessage } from 'enterprise_ui/atoms';

type Props = { fallback: React.ReactNode; children?: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError)
      return (
        <Box>
          <ErrorBoundaryMessage message={this.props.fallback} />
        </Box>
      );
    return this.props.children;
  }
}
