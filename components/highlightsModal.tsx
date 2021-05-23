import { Modal } from 'semantic-ui-react';
import { Highlight } from '../types/highlight.types';
import HighlightsListContainer from './highlightsListContainer';

export default function HighlightsModal({ highlights, open, onClose }: {
  highlights: Array<Highlight>,
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
      <HighlightsListContainer modal highlights={highlights} />
    </Modal>
  )
}