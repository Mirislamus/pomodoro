import { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import meta from '../../data/meta';

const Head: FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />

        <link rel="icon" type="image/svg+xml" href="/images/favicons/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/images/favicons/favicon.ico" />
        
        <meta name="msapplication-TileColor" content={meta.color} />
        <meta name="theme-color" content={meta.color} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`${meta.url}/images/opengraph.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={meta.url} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${meta.url}/images/opengraph.jpg`} />
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
