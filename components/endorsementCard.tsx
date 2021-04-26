import { Card } from 'semantic-ui-react';
import { Endorsement } from '../types/endorsement.types';

export default function EndorsementCard({ endorsement }: {
  endorsement: Endorsement,
}) {

  return (
    <Card fluid key={endorsement.name}>
      {endorsement.text ? <Card.Content textAlign='right'>
        <p style={{ fontSize: '1.2em' }} className='tagline'>
          {endorsement.text}
        </p>
        <p>{endorsement.name}</p>
      </Card.Content> : null}
    </Card >
  )
}