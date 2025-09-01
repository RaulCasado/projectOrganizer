// ProjectsMainView.tsx - CORREGIDO
import { Link } from 'react-router-dom';
import ProjectFilters from './ProjectFilters';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useProjectsMainViewLogic } from '../hooks/useProjectsMainViewLogic';
import { useProjects } from '../../../contexts';
import type { Project } from '../../../shared';

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

  // 🎯 Handler simplificado para guardar proyectos
  const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'lastActivityDate'>) => {
    if (editingProject) {
      // Editar proyecto existente
      updateProject({
        ...editingProject,
        ...projectData,
        lastActivityDate: new Date().toISOString()
      });
    } else {
      // Crear nuevo proyecto
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

      {/* ✅ USAR LA INTERFAZ NUEVA */}
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