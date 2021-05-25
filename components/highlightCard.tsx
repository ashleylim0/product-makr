import Link from 'next/link';
import { Card, Icon } from 'semantic-ui-react';
import { Highlight } from '../types/highlight.types';

export default function HighlightCard({ myHighlight }: {
  myHighlight: Highlight,
}) {

  const target = myHighlight.url.startsWith('/highlights/') ? "_self" : "_blank"
  const iconName = myHighlight.url.startsWith('/highlights/') ? "arrow right" : "external"

  return (
    <Link href={`${myHighlight.url}`} passHref>
      <Card
        as='a'
        target={target}
        href={myHighlight.url}
        key={myHighlight.slug}
        fluid
        style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '8px', marginTop: '30px' }}>
        <Card.Content textAlign='left'>
          <div>
            <h2 className='card-title' style={{ marginTop: 0, marginBottom: '16px', display: 'inline' }}>{myHighlight.title}</h2>
            <Icon name={iconName} style={{ float: 'right', fontSize: '1.33em', paddingTop: '8px' }} />
          </div>
          <p style={{ marginTop: '8px' }} className='tagline'>
            {myHighlight.summary
              ? myHighlight.summary : null}
          </p>
        </Card.Content>
      </Card >
    </Link>
  )
}