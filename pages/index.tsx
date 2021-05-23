import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Header,
  Container
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import remark from 'remark';
import strip from 'strip-markdown';
import fs from 'fs';
import path from 'path';
import Page from '../components/page';
import Meta from '../components/Meta';
import { Portfolio } from '../types/portfolio.types';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ProjectCard from '../components/projectCard';
import HighlightCard from '../components/highlightCard';
import EndorsementItem from '../components/endorsementItem';
import ProjectsModal from '../components/projectsModal';
import HighlightsModal from '../components/highlightsModal';

export default function Home({ portfolio, summary }: { portfolio: Portfolio, summary: string }) {
  const router = useRouter();

  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [highlightsModalOpen, setHighlightsModalOpen] = useState(false);

  const openProjectsModal = () => {
    router.push(`/`, `/projects`, { shallow: true });
    setProjectsModalOpen(true);
  }

  const openHighlightsModal = () => {
    router.push(`/`, `/highlights`, { shallow: true });
    setHighlightsModalOpen(true);
  }

  const closeProjectsModal = () => {
    router.push(`/`, `/`, { shallow: true });
    setProjectsModalOpen(false);
  }

  const closeHighlightsModal = () => {
    router.push(`/`, `/`, { shallow: true });
    setHighlightsModalOpen(false);
  }

  return (
    <div>
      <Meta
        siteName={`${portfolio.name} | Product Manager Portfolio`}
        title={`${portfolio.name} | ${portfolio.title}`}
        desc={summary}
        canonical={`${process.env.PUBLIC_URL}`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            style={{ padding: '1.5em 1em 1.5em', }}
            centered
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '1em 0.5em 2em' }}>
              <Grid.Column width='9'>
                <Header style={{ fontSize: '2.7em' }}>
                  Hi, I'm {portfolio.name.split(' ')[0]} {portfolio.theme.emoji ? portfolio.theme.emoji : "👋"}
                </Header>
                <h1 style={{ fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                  {portfolio.title}
                </h1>
                <div style={{ fontSize: '2.2em' }} >
                  <ReactMarkdown children={portfolio.summary} linkTarget="_blank" />
                </div>
              </Grid.Column>
            </Grid.Row>
            {portfolio.projects && portfolio.projects.length > 0 ?
              <Grid.Row style={{ padding: '1em 0 2em' }}>
                <Grid.Column width='9'>
                  <Header style={{ padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                    Projects
              </Header>
                  {portfolio.projects.slice(0, 3).map((project: any) =>
                    <ProjectCard key={project.slug} project={project} />)}
                  {portfolio.projects.length > 3 ?
                    <Button
                      color='black'
                      style={{ marginTop: '24px' }}
                      fluid
                      onClick={(e) => {
                        openProjectsModal();
                      }}
                    >View All Projects</Button>
                    : null}
                </Grid.Column>
              </Grid.Row> : null
            }

            {portfolio.highlights && portfolio.highlights.length > 0 ?
              <Grid.Row style={{ padding: '1em 0 2em' }}>
                <Grid.Column width='9'>
                  <Header style={{ padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                    Blog &amp; Case Highlights
                </Header>
                  {portfolio.highlights.slice(0, 3).map((myHighlight: any, index: number) =>
                    <HighlightCard key={myHighlight.slug} myHighlight={myHighlight} />
                  )}
                  {portfolio.highlights.length > 3 ?
                    <Button
                      color='black'
                      style={{ marginTop: '24px' }}
                      fluid
                      onClick={(e) => {
                        openHighlightsModal();
                      }}
                    >View All Highlights</Button>
                    : null}
                </Grid.Column>
              </Grid.Row> : null
            }
            <Grid.Row style={{ padding: '1em 0 2em' }}>
              <Grid.Column width='9'>
                <Header style={{ padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                  Endorsements
                </Header>
                {portfolio.endorsements.map((endorsement: any) =>
                  <EndorsementItem key={endorsement.name} endorsement={endorsement} />)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Page>
      {projectsModalOpen ?
        <ProjectsModal
          projects={portfolio.projects}
          open={projectsModalOpen}
          onClose={() => closeProjectsModal()}
        /> : null
      }
      {highlightsModalOpen ?
        <HighlightsModal
          highlights={portfolio.highlights}
          open={highlightsModalOpen}
          onClose={() => closeHighlightsModal()}
        /> : null
      }
    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dataDirectory = path.join(process.cwd(), '/data')
  const filename = 'me.json'

  const filePath = path.join(dataDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const portfolio = JSON.parse(fileContents)

  // Creates markdown free summary for SEO description
  let summary: string;
  remark().use(strip).process(portfolio.summary, function (err, file) {
    if (err) throw err
    summary = String(file)
  })


  return {
    props: {
      portfolio,
      summary
    }
  }
}
