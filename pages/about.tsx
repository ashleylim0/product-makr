import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Header,
  Container
} from 'semantic-ui-react';
import fs from 'fs';
import path from 'path';
import Page from '../components/page';
import Meta from '../components/Meta';
import { Portfolio } from '../types/portfolio.types';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function About({ portfolio, mdData, mdContent }: {
  portfolio: Portfolio,
  mdData: any,
  mdContent: any
}) {

  return (
    <div>
      <Meta
        title={`About | ${portfolio.name}`}
        desc={portfolio.summary}
        canonical={`${process.env.PUBLIC_URL}/about`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <p>{mdData.title}</p>
                <ReactMarkdown children={mdContent} />
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
  const aboutFile = path.join(process.cwd(), `/data/md/about.md`)
  const aboutFileContents = fs.readFileSync(aboutFile, 'utf8')
  const { data, content } = matter(aboutFileContents)

  return {
    props: {
      portfolio,
      mdData: data,
      mdContent: content
    }
  }
}
