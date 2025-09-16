import { useProjects } from '../../../contexts';
import { TagInput } from '../../../shared/components/TagInput';
import styles from './ProjectForm.module.css';

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
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(() => handleSaveProject(values));
      }}
    >
      <h3 className={styles.title}>
        {isEditing ? 'Edit Project' : 'Add Project'}
      </h3>

      <div className={styles.fieldGroup}>
        <label
          htmlFor="project-name"
          className={`${styles.label} ${styles.required}`}
        >
          Project Name
        </label>
        <input
          id="project-name"
          type="text"
          className={styles.input}
          value={values.name}
          placeholder="Project Name"
          onChange={e => setFieldValue('name', e.target.value)}
          disabled={isSubmitting}
          required
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Stack</label>
        <TagInput
          value={values.stack}
          onChange={tags => setFieldValue('stack', tags)}
          placeholder="React, Node.js, TypeScript..."
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Requirements</label>
        <TagInput
          value={values.requirements}
          onChange={tags => setFieldValue('requirements', tags)}
          placeholder="User authentication, Payment system..."
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Dependencies</label>
        <TagInput
          value={values.dependencies}
          onChange={tags => setFieldValue('dependencies', tags)}
          placeholder="Stripe, AWS SDK..."
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Tags</label>
        <TagInput
          value={values.tags}
          onChange={tags => setFieldValue('tags', tags)}
          placeholder="web, mobile, api..."
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.button} ${styles.primaryButton}`}
          disabled={isSubmitting || !values.name.trim()}
        >
          {isSubmitting
            ? isEditing
              ? 'Updating...'
              : 'Creating...'
            : isEditing
              ? 'Update Project'
              : 'Add Project'}
        </button>

        {isEditing && (
          <button
            type="button"
            className={`${styles.button} ${styles.secondaryButton}`}
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
