import React from 'react'
import { SEO } from './SEO'

export const Layout: React.FC = ({ children }) => {

  return (
    <>
      <SEO />
      { children }
    </>
  );
}
