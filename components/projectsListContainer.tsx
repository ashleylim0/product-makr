import {
  Grid,
  Header,
  List
} from 'semantic-ui-react';
import ProjectCard from './projectCard';
import { Project } from '../types/project.types';

export default function ProjectsContainer({ projects, modal }: {
  projects: Array<Project>,
  modal?: boolean
}) {

  const headerColor = modal ? '#fff' : '#212121'
  const gridWidth = modal ? '12' : '9'

  return (
    <>
      <Grid
        style={{ padding: '1.5em 0 1.5em', margin: '3em 0' }}
        centered
        stackable
        textAlign='center'
        verticalAlign='middle'>
        <Grid.Row style={{ padding: '0 0 5em' }}>
          <Grid.Column width={gridWidth}>
            <Header style={{ color: headerColor, padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
              Projects
                </Header>
            {projects.map((item: any) =>
              <ProjectCard key={item.slug} project={item} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}