import { useProjects } from '../../../contexts';

function ProjectForm() {
  const { 
    projectForm, 
    editingProject, 
    handleSaveProject,
    setEditingProject 
  } = useProjects();
  
  const { values, errors, isSubmitting, setFieldValue, handleSubmit } = projectForm;
  const isEditing = !!editingProject;

  const handleArrayField = (field: keyof typeof values, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFieldValue(field, array);
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(() => handleSaveProject(values));
    }}>
      <h3>{isEditing ? 'Edit Project' : 'Add Project'}</h3>
      
      <div>
        <label htmlFor="project-name">Project Name *</label>
        <input
          id="project-name"
          type="text"
          value={values.name}
          placeholder="Project Name"
          onChange={(e) => setFieldValue('name', e.target.value)}
          disabled={isSubmitting}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <label htmlFor="project-stack">Stack (comma separated)</label>
        <input
          id="project-stack"
          type="text"
          placeholder="React, Node.js, TypeScript..."
          value={values.stack.join(', ')}
          onChange={(e) => handleArrayField('stack', e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="project-requirements">Requirements (comma separated)</label>
        <input
          id="project-requirements"
          type="text"
          placeholder="User authentication, Payment system..."
          value={values.requirements.join(', ')}
          onChange={(e) => handleArrayField('requirements', e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="project-dependencies">Dependencies (comma separated)</label>
        <input
          id="project-dependencies"
          type="text"
          placeholder="Stripe, AWS SDK..."
          value={values.dependencies.join(', ')}
          onChange={(e) => handleArrayField('dependencies', e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="project-tags">Tags (comma separated)</label>
        <input
          id="project-tags"
          type="text"
          placeholder="web, mobile, api..."
          value={values.tags.join(', ')}
          onChange={(e) => handleArrayField('tags', e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <button 
          type="submit" 
          disabled={isSubmitting || !values.name.trim()}
        >
          {isSubmitting ? 
            (isEditing ? 'Updating...' : 'Creating...') : 
            (isEditing ? 'Update Project' : 'Add Project')
          }
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;