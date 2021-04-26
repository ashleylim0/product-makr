import {
  Container,
  Segment
} from 'semantic-ui-react';
import { Portfolio } from '../types/portfolio.types';
import LinkButtons from './linkButtons';

export default function Footer({ portfolio }: {
  portfolio: Portfolio
}) {

  return (
    <footer>
      <Segment
        inverted
        vertical
        style={{ width: '100vw', backgroundColor: '#F5F5F7', padding: '5em 0em' }}>
        <Container textAlign='center'>
          {portfolio.profiles ?
            <LinkButtons profiles={portfolio.profiles} /> : null}
          {portfolio.theme.quote ?
            <p className='footer-text'>
              {portfolio.theme.quote}
            </p>
            : null
          }
          <a
            style={{ fontSize: '1.1em' }}
            className='card-link'
            href='https://product.makr.io' target='_blank' rel="noopener">
            <b>Makr Built 🖤</b></a>
        </Container>
      </Segment>
    </footer>
  )
}