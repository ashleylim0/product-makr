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
import { Project } from '../../types/project.types';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

//TODO change case reference to project because copy & pasted
export default function MyProject({ portfolio, myProject, mdData, mdContent }: {
  portfolio: Portfolio,
  myProject: Project,
  mdData: any,
  mdContent: any
}) {

  //TODO revisit, load markdown files properly & get data for initial props
  return (
    <div>
      <Meta
        title={`${myProject.title} | ${portfolio.name}`}
        desc={`${myProject.summary}`}
        canonical={`${process.env.PUBLIC_URL}/projects/${myProject.slug}`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <p>{myProject.title}</p>
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
  const projectsDirectory = path.join(process.cwd(), '/data/md/projects')
  const filenames = fs.readdirSync(projectsDirectory)

  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    return {
      params: {
        project: slug
      }
    }
  })
  return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async context => {
  const projectName = context.params.project
  const dataDirectory = path.join(process.cwd(), '/data')
  const filename = 'me.json'

  const filePath = path.join(dataDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const portfolio = JSON.parse(fileContents)

  //Load specific case from me.json
  const myProject = portfolio.projects.find((currentProject: Project) => currentProject.slug == projectName)

  //Load specific case markdown file
  const projectFile = path.join(process.cwd(), `/data/md/projects/${projectName}.md`)
  const projectFileContents = fs.readFileSync(projectFile, 'utf8')
  const { data, content } = matter(projectFileContents)

  return {
    props: {
      portfolio,
      myProject,
      mdData: data,
      mdContent: content
    }
  }
}
