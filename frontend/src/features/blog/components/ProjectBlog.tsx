import type { BlogEntry } from '../../../shared';
import { useProjectBlog } from '../hooks/useProjectBlog';
import { BlogForm, BlogList, BlogToolbar, BlogModal } from './';

interface ProjectBlogProps {
    blogEntries?: BlogEntry[];
    onUpdateBlogEntries: (entries: BlogEntry[]) => void;
    project?: { name: string };
}

function ProjectBlog({ blogEntries = [], onUpdateBlogEntries, project }: ProjectBlogProps) {
  const {
    isWriting,
    selectedEntry,
    editingEntry,
    handleSaveEntry,
    handleExportWeek,
    handleViewEntry,
    handleEditEntry,
    handleDeleteEntry,
    handleNewEntry,
    handleCancelWriting,
    handleCloseModal,
  } = useProjectBlog({ blogEntries, onUpdateBlogEntries, project });

  return (
    <div>
      <BlogToolbar
        blogEntriesLength={blogEntries.length}
        isWriting={isWriting}
        onExportWeek={handleExportWeek}
        onNewEntry={handleNewEntry}
      />

      {isWriting && (
        <BlogForm
          onSave={handleSaveEntry}
          onCancel={handleCancelWriting}
          editingEntry={editingEntry}
        />
      )}

      <BlogList
        entries={blogEntries}
        onViewEntry={handleViewEntry}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      <BlogModal
        selectedEntry={selectedEntry}
        onClose={handleCloseModal}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}

export default ProjectBlog;
