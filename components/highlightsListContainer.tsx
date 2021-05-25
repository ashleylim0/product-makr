import {
  Grid,
  Header
} from 'semantic-ui-react';
import HighlightCard from './highlightCard';
import { Highlight } from '../types/highlight.types';

export default function HighlightsContainer({ highlights, modal }: {
  highlights: Array<Highlight>,
  modal?: boolean
}) {

  const headerColor = modal ? '#fff' : '#212121'
  const gridWidth = modal ? '12' : '9'

  return (
    <>
      <Grid
        style={{ padding: '1.5em 0 1.5em', margin: '2.2em 0' }}
        centered
        stackable
        textAlign='center'
        verticalAlign='middle'>
        <Grid.Row style={{ padding: '0 0 5em' }}>
          <Grid.Column width={gridWidth}>
            <Header style={{ color: headerColor, padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
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