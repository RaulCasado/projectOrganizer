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
      <Link to="/dashboard">
        <h3>Link a dashboard</h3>
      </Link>
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
            <div key={project.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/project/${project.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h2 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                      📂 {project.name}
                    </h2>
                  </Link>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      {project.tags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(selectedTag === tag ? null : tag);
                          }}
                          style={{
                            backgroundColor: selectedTag === tag ? '#28a745' : '#e1f5fe',
                            color: selectedTag === tag ? 'white' : '#01579b',
                            border: selectedTag === tag ? '2px solid #1e7e34' : '1px solid #b3e5fc',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            marginRight: '6px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontWeight: selectedTag === tag ? 'bold' : 'normal'
                          }}
                          title={selectedTag === tag ? `Quitar filtro de ${tag}` : `Filtrar por ${tag}`}
                          onMouseEnter={(e) => {
                            if (selectedTag !== tag) {
                              e.currentTarget.style.backgroundColor = '#81c784';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedTag !== tag) {
                              e.currentTarget.style.backgroundColor = '#e1f5fe';
                              e.currentTarget.style.color = '#01579b';
                            }
                          }}
                        >
                          🏷️ {tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {project.stack && project.stack.length > 0 && (
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                      🛠️ Stack: {project.stack.join(', ')}
                    </div>
                  )}

                  {project.lastActivityDate && (
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      📅 Última actividad: {new Date(project.lastActivityDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setEditingProject(project)}
                    style={{
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsMainView;