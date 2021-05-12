import { Card } from 'semantic-ui-react';
import { Endorsement } from '../types/endorsement.types';

export default function EndorsementItem({ endorsement }: {
  endorsement: Endorsement,
}) {

  return (
    <div style={{ borderTop: '1px solid #f7f7f7' }}>
      <Card fluid key={endorsement.name} style={{ boxShadow: 'none' }}>
        {endorsement.text ? <Card.Content textAlign='left'>
          <p style={{ fontSize: '1.33em' }} className='tagline'>
            {endorsement.text}
          </p>
          <p style={{ color: '#959595', fontStyle: 'italic', fontSize: '1.33em' }}>- {endorsement.name}</p>
        </Card.Content> : null}
      </Card >
    </div>

  )
}