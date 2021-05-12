import { Card } from 'semantic-ui-react';
import { Case } from '../types/case.types';

export default function CaseCard({ myCase }: {
  myCase: Case,
}) {

  return (
    <Card
      as='a'
      href={myCase.url}
      key={myCase.slug}
      fluid
      link
      style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '22px', marginTop: '30px'  }}>
      <Card.Content textAlign='left'>
        <h2 className='card-title' style={{ marginTop: 0, marginBottom: '8px' }}>{myCase.title}</h2>
        <p style={{ fontSize: '1.1em', marginTop: '8px' }} className='tagline'>
          {myCase.summary
            ? myCase.summary : null}
        </p>
      </Card.Content>
    </Card >
  )
}