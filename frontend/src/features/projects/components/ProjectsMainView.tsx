import { Link } from 'react-router-dom';
import ProjectFilters from './ProjectFilters';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useProjectsMainViewLogic } from '../hooks/useProjectsMainViewLogic';
import { useProjects } from '../../../contexts';

function ProjectsMainView() {
  const { projects, addProject, deleteProject, updateProject } = useProjects();
  const {
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
    selectedTag,
    setSelectedTag,
    isEditing,
    availableTags,
    filteredProjects,
    handleAddProject,
    handleDeleteProject,
    setEditingProject,
  } = useProjectsMainViewLogic({
    projects,
    onAddProject: addProject,
    onDeleteProject: deleteProject,
    onUpdateProject: updateProject,
  });

  return (
    <div>
      <div>
        <Link to="/dashboard">
          📊 Dashboard
        </Link>
        <Link to="/ideas">
          💡 Ideas
        </Link>
      </div>

      <ProjectForm
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        newProjectStack={newProjectStack}
        setNewProjectStack={setNewProjectStack}
        newProjectRequirements={newProjectRequirements}
        setNewProjectRequirements={setNewProjectRequirements}
        newProjectDependencies={newProjectDependencies}
        setNewProjectDependencies={setNewProjectDependencies}
        newProjectTags={newProjectTags}
        setNewProjectTags={setNewProjectTags}
        isEditing={isEditing}
        onAddProject={handleAddProject}
        onCancelEdit={() => setEditingProject(null)}
      />

      <ProjectFilters
        selectedTag={selectedTag}
        onTagFilterChange={setSelectedTag}
        availableTags={availableTags}
      />

      <ProjectList
        projects={filteredProjects}
        onEditProject={setEditingProject}
        onDeleteProject={handleDeleteProject}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
    </div>
  );
}

export default ProjectsMainView;