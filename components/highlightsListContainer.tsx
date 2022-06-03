import {
  Grid,
  Header
} from 'semantic-ui-react';
import HighlightCard from './highlightCard';
import { Highlight } from '../types/highlight.types';

export default function HighlightsContainer({ highlights }: {
  highlights: Array<Highlight>
}) {

  return (
    <>
      <Grid
        style={{ padding: '1.5em 0 1.5em', margin: '2.2em 0' }}
        centered
        stackable
        textAlign='center'
        verticalAlign='middle'>
        <Grid.Row style={{ padding: '0 0 5em' }}>
          <Grid.Column width='9'>
            <Header style={{ color: '#212121', fontSize: '2.2em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
              Blog &amp; Case Highlights
              </Header>
            {highlights.map((item: any) =>
              <HighlightCard key={item.slug} myHighlight={item} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}