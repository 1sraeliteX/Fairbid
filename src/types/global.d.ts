import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      body: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLBodyElement>,
        HTMLBodyElement
      >;
    }
  }
}
