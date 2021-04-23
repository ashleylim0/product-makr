import {
  Container,
  Segment
} from 'semantic-ui-react';

export default function Footer() {

  return (
    <footer>
      <Segment
        inverted
        vertical
        style={{ width: '100vw', backgroundColor: '#F5F5F7', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <a
            style={{ fontSize: '1.2em' }}
            className='card-link'
            href='https://product.makr.io' target='_blank' rel="noopener">
            {`© ${new Date().getFullYear()} Built with `}<b>Makr</b></a>
        </Container>
      </Segment>
    </footer>
  )
}