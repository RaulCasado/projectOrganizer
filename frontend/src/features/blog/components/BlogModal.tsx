import type { BlogEntry } from '../../../shared/types';
import Modal from '../../../shared/components/Modal';
import BlogDetail from './BlogDetail';

interface BlogModalProps {
  selectedEntry: BlogEntry | null;
  onClose: () => void;
  onEdit: (entry: BlogEntry) => void;
  onDelete: (entryId: string) => void;
}

function BlogModal({ selectedEntry, onClose, onEdit, onDelete }: BlogModalProps) {
  return (
    <Modal
      isOpen={selectedEntry !== null}
      onClose={onClose}
      title="Entrada del diario"
    >
      {selectedEntry && (
        <BlogDetail
          entry={selectedEntry}
          onEdit={() => onEdit(selectedEntry)}
          onDelete={() => onDelete(selectedEntry.id)}
        />
      )}
    </Modal>
  );
}

export default BlogModal;
