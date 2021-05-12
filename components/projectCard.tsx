import { Card } from 'semantic-ui-react';
import { Project } from '../types/project.types';

export default function ProjectCard({ project }: {
  project: Project,
}) {

  return (
    <Card
      as="a"
      target="_blank"
      href={project.links[0] ? project.links[0].url : null}
      key={project.slug}
      fluid
      style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '22px', marginTop: '30px' }}>
      <Card.Content textAlign='left'>
        <h2 className='card-title' style={{ marginTop: 0, marginBottom: '8px' }}>{project.title}</h2>
        <p style={{ fontSize: '1.1em', marginTop: '8px' }} className='tagline'>
          {project.summary
            ? project.summary : null}
        </p>
      </Card.Content>
    </Card >
  )
}