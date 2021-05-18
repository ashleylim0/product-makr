import { Card } from 'semantic-ui-react';
import { Highlight } from '../types/highlight.types';

export default function HighlightCard({ myHighlight }: {
  myHighlight: Highlight,
}) {

  return (
    <Card
      as='a'
      href={myHighlight.url}
      key={myHighlight.slug}
      fluid
      link
      style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '22px', marginTop: '30px' }}>
      <Card.Content textAlign='left'>
        <h2 className='card-title' style={{ marginTop: 0, marginBottom: '8px' }}>{myHighlight.title}</h2>
        <p style={{ fontSize: '1.1em', marginTop: '8px' }} className='tagline'>
          {myHighlight.summary
            ? myHighlight.summary : null}
        </p>
      </Card.Content>
    </Card >
  )
}