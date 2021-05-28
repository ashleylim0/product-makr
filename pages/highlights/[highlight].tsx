import {
  Card,
  Grid,
  Container,
  Header
} from 'semantic-ui-react';
import fs from 'fs';
import path from 'path';
import Page from '../../components/page';
import Meta from '../../components/Meta';
import { Portfolio } from '../../types/portfolio.types';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Highlight } from '../../types/highlight.types';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function MyHighlight({ portfolio, myHighlight, mdData, mdContent }: {
  portfolio: Portfolio,
  myHighlight: Highlight,
  mdData: any,
  mdContent: any
}) {

  const shareImage = myHighlight.shareImageUrl ? `${process.env.PUBLIC_URL}${myHighlight.shareImageUrl}` : '/share.png'

  //TODO revisit, load markdown files properly & get data for initial props
  return (
    <div>
      <Meta
        title={`${myHighlight.title} | ${portfolio.name}`}
        desc={`${myHighlight.summary}`}
        canonical={`${process.env.PUBLIC_URL}/highlights/${myHighlight.slug}`}
        image={shareImage} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '2.2em 0' }}>
          <Grid
            style={{ padding: '1.5em 1em 3.5em' }}
            centered
            stackable
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <Card
                  key={myHighlight.slug}
                  fluid
                  style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '8px', marginTop: '30px' }}>
                  <Card.Content textAlign='left'>
                    <div>
                      <h2 className='card-title' style={{ marginTop: 0, marginBottom: '16px', display: 'inline' }}>{myHighlight.title}</h2>
                    </div>
                    <p style={{ marginTop: '8px' }} className='tagline'>
                      {myHighlight.summary
                        ? myHighlight.summary : null}
                    </p>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: '1em 0.5em 2em' }}>
              <Grid.Column width='9'>
                <Header style={{ color: '#212121', padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                  {myHighlight.title}
                </Header>
                <div style={{ fontSize: '2.2em' }} >
                  <ReactMarkdown children={mdContent} linkTarget="_blank" />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Page>
    </div >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const highlightsDirectory = path.join(process.cwd(), '/data/md/highlights');
  let paths = [];

  if (fs.existsSync(highlightsDirectory)) {
    const filenames = fs.readdirSync(highlightsDirectory);
    paths = filenames.map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      return {
        params: {
          highlight: slug
        }
      }
    });
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async context => {
  const highlightName = context.params.highlight;
  const dataDirectory = path.join(process.cwd(), '/data');
  const filename = 'me.json';

  const filePath = path.join(dataDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  //Load specific highlight from me.json
  const myHighlight = portfolio.highlights.find((currentHighlight: Highlight) => currentHighlight.slug == highlightName);

  //Load specific highlight markdown file
  const highlightFilePath = path.join(process.cwd(), `/data/md/highlights/${highlightName}.md`);
  let highlightFileContents = null;
  let mdData = null;
  let mdContent = null;
  if (fs.existsSync(highlightFilePath)) {
    highlightFileContents = fs.readFileSync(highlightFilePath, 'utf8');
    const { data, content } = matter(highlightFileContents);
    mdData = data;
    mdContent = content;
  }

  return {
    props: {
      portfolio,
      myHighlight,
      mdData: mdData,
      mdContent: mdContent
    }
  }
}
