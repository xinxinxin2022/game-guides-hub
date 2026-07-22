export const dynamic = 'force-static';

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/en" />
      </head>
      <body>
        <p>Redirecting to <a href="/en">English version</a>...</p>
      </body>
    </html>
  );
}
