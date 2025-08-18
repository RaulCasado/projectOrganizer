import { useState, useEffect } from 'react';
import type { Project } from '../types/Project';
import { Link } from 'react-router-dom';
import ProjectFilters from './ProjectFilters';
import Swal from 'sweetalert2';

interface ProjectsMainViewProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProject: (project: Project) => void;
}

function ProjectsMainView({ projects, onAddProject, onDeleteProject, onUpdateProject }: ProjectsMainViewProps) {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectStack, setNewProjectStack] = useState<string[]>([]);
  const [newProjectRequirements, setNewProjectRequirements] = useState<string[]>([]);
  const [newProjectDependencies, setNewProjectDependencies] = useState<string[]>([]);
  const [newProjectTags, setNewProjectTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const isEditing = !!editingProject;

  const getAllTags = () => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const getFilteredProjects = () => {
    if (!selectedTag) return projects;

    return projects.filter(project => project.tags?.includes(selectedTag));
  };

  useEffect(() => {
    if (editingProject) {
      setNewProjectName(editingProject.name);
      setNewProjectStack(editingProject.stack || []);
      setNewProjectRequirements(editingProject.requirements || []);
      setNewProjectDependencies(editingProject.dependencies || []);
      setNewProjectTags(editingProject.tags || []);
    } else {
      setNewProjectName('');
      setNewProjectStack([]);
      setNewProjectRequirements([]);
      setNewProjectDependencies([]);
      setNewProjectTags([]);
    }
  }, [editingProject]);

  const availableTags = getAllTags();
  const filteredProjects = getFilteredProjects();

  const handleAddProject = () => {
    if (!newProjectName) return;

    const projectData: Omit<Project, 'id'> = {
      name: newProjectName,
      stack: newProjectStack,
      requirements: newProjectRequirements,
      dependencies: newProjectDependencies,
      tags: newProjectTags,
    };

    if (editingProject) {
      onUpdateProject({ ...editingProject, ...projectData });
      setEditingProject(null);
    } else {
      onAddProject(projectData);
      setNewProjectName('');
      setNewProjectStack([]);
      setNewProjectRequirements([]);
      setNewProjectDependencies([]);
      setNewProjectTags([]);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `
        <p>Vas a eliminar el proyecto:</p>
        <strong>"${project.name}"</strong>
        <br><br>
        <small>Esta acción no se puede deshacer.</small>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: true,
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      onDeleteProject(project.id);
      Swal.fire({
        title: '¡Eliminado!',
        text: `El proyecto "${project.name}" ha sido eliminado.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
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
        <button onClick={handleAddProject}>
          {isEditing ? 'Update Project' : 'Add Project'}
        </button>
        {isEditing && (
          <button onClick={() => setEditingProject(null)}>Cancel</button>
        )}
      </div>

      <ProjectFilters
        selectedTag={selectedTag}
        onTagFilterChange={setSelectedTag}
        availableTags={availableTags}
      />
      <div>
        {filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id}>
              <Link to={`/project/${project.id}`}>
                <h2>{project.name}</h2>
              </Link>
              <div>
                <button onClick={() => setEditingProject(project)}>Edit</button>
                <button onClick={() => handleDeleteProject(project)}>Delete</button>
              </div>
              <div>
                <h3>Tags:</h3>
                <ul>
                  {project.tags?.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsMainView;