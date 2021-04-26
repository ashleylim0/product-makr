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
import ProjectCard from '../components/projectCard';
import CaseCard from '../components/caseCard';
import EndorsementCard from '../components/endorsementCard';

export default function Home({ portfolio }: { portfolio: Portfolio }) {

  return (
    <div>
      <Meta
        siteName={`${portfolio.name} | Product Manager Portfolio`}
        title={`${portfolio.name} | ${portfolio.title}`}
        desc={portfolio.summary}
        canonical={`${process.env.PUBLIC_URL}`} />

      <Page portfolio={portfolio}>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            style={{ padding: '1em 2em 3em', }}
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
                <p style={{ fontSize: '2.2em' }}>
                  {portfolio.summary}
                </p>
              </Grid.Column>
            </Grid.Row>
            {portfolio.projects && portfolio.projects.length > 0 ?
              <Grid.Row style={{ padding: '0.5em 0.5em 2em' }}>
                <Grid.Column width='9'>
                  <Header style={{ fontSize: '2.7em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                    Projects
              </Header>
                  <p style={{ fontSize: '2em' }}>
                    {/* PROJECTS */}
                  </p>
                  {portfolio.projects.map((project: any) =>
                    <ProjectCard key={project.slug} project={project} />)}
                </Grid.Column>
              </Grid.Row> : null
            }

            {portfolio.cases && portfolio.cases.length > 0 ?
              <Grid.Row style={{ padding: '0.5em 0.5em 2em' }}>
                <Grid.Column width='9'>
                  <Header style={{ fontSize: '2.7em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                    Blog &amp; Case Highlights
                </Header>
                  <p style={{ fontSize: '2em' }}>
                    {/* CASES */}
                  </p>
                  {portfolio.cases.map((myCase: any) =>
                    <CaseCard key={myCase.slug} myCase={myCase} />)}
                </Grid.Column>
              </Grid.Row> : null
            }
            <Grid.Row style={{ padding: '0.5em 0.5em 2em' }}>
              <Grid.Column width='9'>
                <Header style={{ fontSize: '2.7em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
                  Endorsements
                </Header>
                <p style={{ fontSize: '2em' }}>
                  {/* Endorsements */}
                </p>
                {portfolio.endorsements.map((endorsement: any) =>
                  <EndorsementCard key={endorsement.name} endorsement={endorsement} />)}
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

  return {
    props: {
      portfolio
    }
  }
}
