import { Modal } from 'semantic-ui-react';
import { Project } from '../types/project.types';
import ProjectsListContainer from './projectsListContainer';

export default function ProjectsModal({ projects, open, onClose }: {
  projects: Array<Project>,
  open: boolean,
  onClose: any
}) {

  return (
    <Modal
      basic
      open={open}
      closeOnDimmerClick={true}
      onClose={onClose}
      closeIcon>
      <ProjectsListContainer modal projects={projects} />
    </Modal>
  )
}