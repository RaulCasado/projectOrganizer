import { useProjects } from '../../../contexts';
import { TagInput } from '../../../shared/components/TagInput';

function ProjectForm() {
  const { projectForm, editingProject, handleSaveProject, setEditingProject } =
    useProjects();

  const { values, errors, isSubmitting, setFieldValue, handleSubmit } =
    projectForm;
  const isEditing = !!editingProject;

  const handleCancel = () => {
    setEditingProject(null);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(() => handleSaveProject(values));
      }}
    >
      <h3>{isEditing ? 'Edit Project' : 'Add Project'}</h3>

      <div>
        <label htmlFor="project-name">Project Name *</label>
        <input
          id="project-name"
          type="text"
          value={values.name}
          placeholder="Project Name"
          onChange={e => setFieldValue('name', e.target.value)}
          disabled={isSubmitting}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Stack</label>
        <TagInput
          value={values.stack}
          onChange={tags => setFieldValue('stack', tags)}
          placeholder="React, Node.js, TypeScript..."
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Requirements</label>
        <TagInput
          value={values.requirements}
          onChange={tags => setFieldValue('requirements', tags)}
          placeholder="User authentication, Payment system..."
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Dependencies</label>
        <TagInput
          value={values.dependencies}
          onChange={tags => setFieldValue('dependencies', tags)}
          placeholder="Stripe, AWS SDK..."
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Tags</label>
        <TagInput
          value={values.tags}
          onChange={tags => setFieldValue('tags', tags)}
          placeholder="web, mobile, api..."
          disabled={isSubmitting}
        />
      </div>

      <div>
        <button type="submit" disabled={isSubmitting || !values.name.trim()}>
          {isSubmitting
            ? isEditing
              ? 'Updating...'
              : 'Creating...'
            : isEditing
              ? 'Update Project'
              : 'Add Project'}
        </button>

        {isEditing && (
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
