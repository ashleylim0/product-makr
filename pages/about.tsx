import {
  Grid,
  Container,
  Header
} from 'semantic-ui-react';
import fs from 'fs';
import path from 'path';
import Page from '../components/page';
import Meta from '../components/Meta';
import { Portfolio } from '../types/portfolio.types';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remark from 'remark';
import strip from 'strip-markdown';

export default function About({ portfolio, summary, mdData, mdContent }: {
  portfolio: Portfolio,
  summary: string,
  mdData: any,
  mdContent: any
}) {

  return (
    <div>
      <Meta
        title={`About | ${portfolio.name}`}
        desc={summary}
        canonical={`${process.env.PUBLIC_URL}/about`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '2.2em 0' }}>
          <Grid
            style={{ padding: '1.5em 1em 3.5em' }}
            centered
            stackable
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '1em 0.5em 2em' }}>
              <Grid.Column width='9'>
                {mdData.author && mdData.author.picture ?
                  <Image
                    alt={portfolio.name}
                    height={320}
                    width={320}
                    src={mdData.author.picture}
                    className='card-image-header'
                  /> : null}
                <Header style={{ color: '#212121', padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                  {mdData.title ? mdData.title : "About Me"}
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

export const getStaticProps: GetStaticProps = async () => {
  const dataDirectory = path.join(process.cwd(), '/data')
  const filename = 'me.json'

  const filePath = path.join(dataDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const portfolio = JSON.parse(fileContents)

  //Load about markdown file
  const aboutFile = path.join(process.cwd(), `/data/md/about/about.md`)
  const aboutFileContents = fs.readFileSync(aboutFile, 'utf8')
  const { data, content } = matter(aboutFileContents)

  // Creates markdown free summary for SEO description
  let summary: string;
  remark().use(strip).process(portfolio.summary, function (err, file) {
    if (err) throw err
    summary = String(file)
  })


  return {
    props: {
      portfolio,
      summary,
      mdData: data,
      mdContent: content
    }
  }
}
