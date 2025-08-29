interface ProjectFormProps {
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  newProjectStack: string[];
  setNewProjectStack: (stack: string[]) => void;
  newProjectRequirements: string[];
  setNewProjectRequirements: (requirements: string[]) => void;
  newProjectDependencies: string[];
  setNewProjectDependencies: (dependencies: string[]) => void;
  newProjectTags: string[];
  setNewProjectTags: (tags: string[]) => void;
  isEditing: boolean;
  onAddProject: () => void;
  onCancelEdit: () => void;
}

function ProjectForm({
  newProjectName,
  setNewProjectName,
  newProjectStack,
  setNewProjectStack,
  newProjectRequirements,
  setNewProjectRequirements,
  newProjectDependencies,
  setNewProjectDependencies,
  newProjectTags,
  setNewProjectTags,
  isEditing,
  onAddProject,
  onCancelEdit,
}: ProjectFormProps) {
  return (
    <div>
      <h3>{isEditing ? 'Edit Project' : 'Add Project'}</h3>
      <input
        type="text"
        value={newProjectName}
        placeholder="Project Name"
        onChange={e => setNewProjectName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stack (comma separated)"
        value={newProjectStack.join(', ')}
        onChange={e => setNewProjectStack(e.target.value.split(',').map(item => item.trim()))}
      />
      <input
        type="text"
        placeholder="Requirements (comma separated)"
        value={newProjectRequirements.join(', ')}
        onChange={e => setNewProjectRequirements(e.target.value.split(',').map(item => item.trim()))}
      />
      <input
        type="text"
        placeholder="Dependencies (comma separated)"
        value={newProjectDependencies.join(', ')}
        onChange={e => setNewProjectDependencies(e.target.value.split(',').map(item => item.trim()))}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={newProjectTags.join(', ')}
        onChange={e => setNewProjectTags(e.target.value.split(',').map(item => item.trim()))}
      />
      <button onClick={onAddProject}>
        {isEditing ? 'Update Project' : 'Add Project'}
      </button>
      {isEditing && (
        <button onClick={onCancelEdit}>Cancel</button>
      )}
    </div>
  );
}

export default ProjectForm;
