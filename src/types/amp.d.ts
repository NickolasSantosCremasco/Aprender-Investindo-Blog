import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'amp-story': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          standalone?: string;
          title?: string;
          publisher?: string;
          'publisher-logo-src'?: string;
          'poster-portrait-src'?: string;
        },
        HTMLElement
      >;
      'amp-story-page': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
        },
        HTMLElement
      >;
      'amp-story-grid-layer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          template?: string;
        },
        HTMLElement
      >;
      'amp-story-cta-layer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'amp-img': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          width?: string | number;
          height?: string | number;
          layout?: string;
          alt?: string;
        },
        HTMLElement
      >;
    }
  }

  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    amp?: string;
  }
}