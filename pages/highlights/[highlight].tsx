import {
  Grid,
  Container
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

  //TODO revisit, load markdown files properly & get data for initial props
  return (
    <div>
      <Meta
        title={`${myHighlight.title} | ${portfolio.name}`}
        desc={`${myHighlight.summary}`}
        canonical={`${process.env.PUBLIC_URL}/highlights/${myHighlight.slug}`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <p>{myHighlight.title}</p>
                <ReactMarkdown children={mdContent} />
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
  let paths = []

  if (fs.existsSync(highlightsDirectory)) {
    const filenames = fs.readdirSync(highlightsDirectory);
    paths = filenames.map((filename) => {
      const slug = filename.replace(/\.md$/, '')
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
