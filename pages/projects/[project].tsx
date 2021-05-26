import {
  Card,
  Grid,
  Container,
  Icon,
  Label
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
        <Container style={{ width: '100vw', margin: '2.2em 0' }}>
          <Grid
            style={{ padding: '1.5em 1em 1.5em', }}
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>
                <p>{myProject.title}</p>
                <Card
                  key={myProject.slug}
                  fluid
                  style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '12px', marginTop: '30px' }}>
                  <Card.Content textAlign='left'>
                    <div>
                      <h2 className='card-title' style={{ margin: '0 0 16px 0', display: 'inline' }}>{myProject.title}</h2>
                    </div>
                    <p style={{ marginTop: '8px' }} className='tagline'>
                      {myProject.summary
                        ? myProject.summary : null}
                    </p>
                    {myProject.roles && myProject.roles.length > 0
                      ?
                      myProject.roles.map((role: string, key) =>
                        <Label
                          key={key}
                          size='large'
                          className='role-label'
                          style={{ display: 'inline-block', margin: '0.2em 0.4em 0.4em 0', padding: '0.5em' }}>
                          {role}
                        </Label>)
                      : null}
                    {myProject.keywords && myProject.keywords.length > 0
                      ?
                      <div>
                        {myProject.keywords.map((keyword: string, key) =>
                          <Label
                            key={key}
                            size='large'
                            className='keyword-label'
                            style={{ display: 'inline-block', margin: '0.2em 0.4em 0.4em 0', padding: '0.5em' }}>
                            {keyword}
                          </Label>)}
                      </div>
                      : null}
                  </Card.Content>
                </Card >
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
  const dataDirectory = path.join(process.cwd(), '/data');
  const filename = 'me.json';

  const filePath = path.join(dataDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  const paths = portfolio.projects.map((project: Project) => {
    return {
      params: {
        project: project.slug
      }
    }
  });


  return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async context => {
  const projectName = context.params.project;
  const dataDirectory = path.join(process.cwd(), '/data');
  const filename = 'me.json';

  const filePath = path.join(dataDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  //Load specific project from me.json
  const myProject = portfolio.projects.find((currentProject: Project) => currentProject.slug == projectName);

  //Load specific project markdown file
  const projectFilePath = path.join(process.cwd(), `/data/md/projects/${projectName}.md`);
  let projectFileContents = null;
  let mdData = null;
  let mdContent = null;
  if (fs.existsSync(projectFilePath)) {
    projectFileContents = fs.readFileSync(projectFilePath, 'utf8');
    const { data, content } = matter(projectFileContents);
    mdData = data;
    mdContent = content;
  }

  return {
    props: {
      portfolio,
      myProject,
      mdData: mdData,
      mdContent: mdContent
    }
  }
}
