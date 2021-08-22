import Head from 'next/head';
import { SEOProps } from '../types/seo.types';

export default function Meta(props: SEOProps) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={props.title} />
      <meta name="og:description" property="og:description" content={props.desc} />
      <meta property="og:site_name" content={props.siteName} />
      <meta property="og:url" content={props.canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.desc} />
      <meta name="twitter:site" content={props.twitter} />
      <meta name="twitter:creator" content={props.twitter} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="theme-color" content={props.color} />
      <link rel="icon" type="image/png" href={props.icon ? props.icon : "/favicon.png"} />
      <link rel="apple-touch-icon" href="/favicon.png" />
      {
        props.css &&
        <link rel="stylesheet" href={props.css} />
      }
      {
        props.image ? (
          <meta property="og:image" content={props.image} />
        ) : (
          <meta property="og:image" content="/share.png" />
        )
      }
      {
        props.image ? (
          <meta name="twitter:image" content={props.image} />
        ) : (
          <meta name="twitter:image" content="/share.png" />
        )
      }
      {
        props.canonical &&
        <link rel="canonical" href={props.canonical} />
      }
    </Head>
  )
}