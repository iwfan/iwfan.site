declare module 'typography-theme-github' {
  type Options = {
    baseFontSize?: string;
  };
  const options: Options;
  export = options;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}
