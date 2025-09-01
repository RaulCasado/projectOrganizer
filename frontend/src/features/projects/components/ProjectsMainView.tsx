import { Link } from 'react-router-dom';
import { useProjectsMainViewLogic } from '../hooks/useProjectsMainViewLogic';
import { useProjects } from '../../../contexts';
import type { Project } from '../../../shared';
import { ProjectFilters, ProjectForm, ProjectList } from './';

function ProjectsMainView() {
  const { projects, addProject, deleteProject, updateProject } = useProjects();
  const {
    selectedTag,
    setSelectedTag,
    editingProject,
    setEditingProject,
    availableTags,
    filteredProjects,
    handleDeleteProject,
  } = useProjectsMainViewLogic({
    projects,
    onDeleteProject: deleteProject,
  });

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'lastActivityDate'>) => {
    if (editingProject) {
      updateProject({
        ...editingProject,
        ...projectData,
        lastActivityDate: new Date().toISOString()
      });
    } else {
      addProject(projectData);
    }
    setEditingProject(null);
  };

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
        editingProject={editingProject}
        onSave={handleSaveProject}
        onCancel={() => setEditingProject(null)}
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