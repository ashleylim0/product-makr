import {
  Grid,
  Header,
  List
} from 'semantic-ui-react';
import ProjectCard from './projectCard';
import { Project } from '../types/project.types';

export default function ProjectsContainer({ projects }: {
  projects: Array<Project>
}) {

  return (
    <>
      <Grid
        style={{ padding: '1.5em 0 1.5em', margin: '2.2em 0' }}
        centered
        stackable
        textAlign='center'
        verticalAlign='middle'>
        <Grid.Row style={{ padding: '0 0 5em' }}>
          <Grid.Column width='9'>
            <Header style={{ color: '#212121', padding: '0 0.1em', fontSize: '2.5em', textTransform: 'uppercase', wordWrap: 'break-word' }}>
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