import Link from 'next/link';
import { Card, Label, Icon } from 'semantic-ui-react';
import { Project } from '../types/project.types';

export default function ProjectCard({ project }: {
  project: Project,
}) {

  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <Card
        as="a"
        key={project.slug}
        fluid
        style={{ boxShadow: '0 0 30px 0 rgb(0 0 0 / 12%)', borderRadius: '8px', padding: '8px', marginTop: '30px' }}>
        <Card.Content textAlign='left'>
          <div>
            <h2 className='card-title' style={{ marginTop: 0, marginBottom: '16px', display: 'inline' }}>{project.title}</h2>
            <Icon name='arrow right' style={{ float: 'right', fontSize: '1.33em', paddingTop: '8px' }} />
          </div>
          <p style={{ marginTop: '8px' }} className='tagline'>
            {project.summary
              ? project.summary : null}
          </p>
          {project.roles && project.roles.length > 0
            ?
            project.roles.map((role: string, key) =>
              <Label
                key={key}
                size='large'
                className='role-label'
                style={{ display: 'inline-block', margin: '0.4em 0.4em 0.4em 0', padding: '0.5em' }}>
                {role}
              </Label>)
            : null}
        </Card.Content>
      </Card >
    </Link>
  )
}