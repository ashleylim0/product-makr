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
import { Case } from '../../types/case.types';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function MyCase({ portfolio, myCase, mdData, mdContent }: {
  portfolio: Portfolio,
  myCase: Case,
  mdData: any,
  mdContent: any
}) {

  //TODO revisit, load markdown files properly & get data for initial props
  return (
    <div>
      <Meta
        title={`${myCase.title} | ${portfolio.name}`}
        desc={`${myCase.summary}`}
        canonical={`${process.env.PUBLIC_URL}/cases/${myCase.slug}`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <p>{myCase.title}</p>
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
  const casesDirectory = path.join(process.cwd(), '/data/md/cases')
  const filenames = fs.readdirSync(casesDirectory)

  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    return {
      params: {
        case: slug
      }
    }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async context => {
  const caseName = context.params.case
  const dataDirectory = path.join(process.cwd(), '/data')
  const filename = 'me.json'

  const filePath = path.join(dataDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const portfolio = JSON.parse(fileContents)

  //Load specific case from me.json
  const myCase = portfolio.cases.find((currentCase: Case) => currentCase.slug == caseName)

  //Load specific case markdown file
  const caseFile = path.join(process.cwd(), `/data/md/cases/${caseName}.md`)
  const caseFileContents = fs.readFileSync(caseFile, 'utf8')
  const { data, content } = matter(caseFileContents)

  return {
    props: {
      portfolio,
      myCase,
      mdData: data,
      mdContent: content
    }
  }
}
