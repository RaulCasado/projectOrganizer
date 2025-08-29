import { useState } from 'react';
import { useProjectTasks } from '../hooks/useProjectTasks';
import type { Project, BlogEntry, Resource } from '../../../shared/types';
import type { Idea } from '../../../shared/types/Idea';
import { TaskList, TaskForm, TaskFilters } from '../../tasks/components';
import { ProjectBlog } from '../../blog/components';
import { ProjectResources } from '../../resources/components';
import { MVPSection } from './';
import { IdeaPanel } from '../../ideas/components';
import { useSketches } from '../../../shared/hooks/useSketches';
import SketchCanvas from '../../sketches/components/SketchCanvas';
import { DateUtils } from '../../../shared';

interface ProjectDetailProps {
  project: Project;
  ideas: Idea[];
  onUpdateProject: (updatedProject: Project) => void;
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: string) => void;
}

function ProjectDetail({ 
  project, 
  ideas,
  onUpdateProject,
  onAddIdea,
  onUpdateIdea,
  onDeleteIdea
}: ProjectDetailProps) {

  const {
    editingTask,
    setEditingTask,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchText,
    setSearchText,
    filteredTasks,
    handleUpdateTask,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleCancelEdit,
  } = useProjectTasks(project, onUpdateProject);

  const [showSketchModal, setShowSketchModal] = useState(false);
  const [editingSketch, setEditingSketch] = useState<{
    id: string;
    name: string;
    imageData: string;
  } | undefined>(undefined);

  const { 
    sketches, 
    loading: sketchesLoading, 
    error: sketchesError,
    sketchCount, 
    maxSketches, 
    isAtLimit,
    deleteSketch 
  } = useSketches({ projectId: project.id });

  const handleUpdateResources = (resources: Resource[]) => {
    const updatedProject = {
      ...project,
      resources,
      lastActivityDate: DateUtils.dateToday()
    };
    onUpdateProject(updatedProject);
  };

  const handleUpdateBlogEntries = (blogEntries: BlogEntry[]) => {
    onUpdateProject({
      ...project,
      blogEntries,
      lastActivityDate: DateUtils.dateToday()
    });
  };

  const handleUpdateMVP = (mvp: string) => {
    onUpdateProject({
      ...project,
      mvp
    });
  };

  const handleOpenSketchModal = () => {
    setEditingSketch(undefined);
    setShowSketchModal(true);
  };

  const handleEditSketch = (sketch: any) => {
    setEditingSketch({
      id: sketch.id,
      name: sketch.name,
      imageData: sketch.imageData
    });
    setShowSketchModal(true);
  };

  const handleCloseSketchModal = () => {
    setShowSketchModal(false);
    setEditingSketch(undefined);
  };

  const handleDeleteSketch = async (sketchId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este sketch?')) {
      deleteSketch(sketchId);
    }
  };

  return (
    <div>
      <h1>{project.name}</h1>
      
      {project.stack && project.stack.length > 0 && (
        <div>
          <h3>Stack:</h3>
          <ul>
            {project.stack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {project.requirements && project.requirements.length > 0 && (
        <div>
          <h3>Requirements:</h3>
          <ul>
            {project.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {project.dependencies && project.dependencies.length > 0 && (
        <div>
          <h3>Dependencies:</h3>
          <ul>
            {project.dependencies.map((dep, index) => (
              <li key={index}>{dep}</li>
            ))}
          </ul>
        </div>
      )}
      
      <MVPSection 
        mvp={project.mvp}
        onUpdateMVP={handleUpdateMVP}
      />

      <ProjectResources
        resources={project.resources}
        onUpdateResources={handleUpdateResources}
      />

      <ProjectBlog 
        blogEntries={project.blogEntries}
        onUpdateBlogEntries={handleUpdateBlogEntries}
        project={project}
      />

      <section className="project-sketches">
        <div className="section-header">
          <h3>📐 Quick Sketches ({sketchCount}/{maxSketches})</h3>
          
          <button 
            onClick={handleOpenSketchModal}
            disabled={isAtLimit}
            className="btn btn-primary"
            title={isAtLimit ? `Máximo ${maxSketches} sketches por proyecto` : 'Crear nuevo sketch'}
          >
            + New Sketch
          </button>
        </div>

        {sketchesError && (
          <div className="error-message">
            Error cargando sketches: {sketchesError}
          </div>
        )}

        {sketchesLoading ? (
          <div className="loading">Cargando sketches...</div>
        ) : (
          <div className="sketches-grid">
            {sketches.length === 0 ? (
              <div className="empty-state">
                <p>No hay sketches en este proyecto</p>
                <button 
                  onClick={handleOpenSketchModal}
                  className="btn btn-outline"
                  disabled={isAtLimit}
                >
                  Crear el primero
                </button>
              </div>
            ) : (
              sketches.map(sketch => (
                <div key={sketch.id} className="sketch-card">
                  <div className="sketch-preview">
                    <img 
                      src={sketch.imageData} 
                      alt={sketch.name}
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="sketch-info">
                    <h4>{sketch.name}</h4>
                    {sketch.description && (
                      <p className="sketch-description">{sketch.description}</p>
                    )}
                    <small className="sketch-date">
                      {DateUtils.formatShort(sketch.createdAt)}
                    </small>
                  </div>
                  
                  <div className="sketch-actions">
                    <button 
                      onClick={() => handleEditSketch(sketch)}
                      className="btn btn-sm btn-outline"
                      title="Editar sketch"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDeleteSketch(sketch.id)}
                      className="btn btn-sm btn-danger"
                      title="Eliminar sketch"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {isAtLimit && (
          <div className="limit-warning">
            ⚠️ Has alcanzado el límite de {maxSketches} sketches por proyecto.
            Elimina algunos para crear nuevos.
          </div>
        )}
      </section>

      <TaskForm 
        onAddTask={editingTask ? undefined : handleAddTask}
        onUpdateTask={editingTask ? handleUpdateTask : undefined}
        editingTask={editingTask}
        onCancel={editingTask ? handleCancelEdit : undefined}
      />
      <TaskFilters 
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        searchText={searchText}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onSearchTextChange={setSearchText}
      />
      <TaskList 
        tasks={filteredTasks} 
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={setEditingTask}
      />

      <IdeaPanel 
        projectId={project.id}
        ideas={ideas}
        onAddIdea={onAddIdea}
        onUpdateIdea={onUpdateIdea}
        onDeleteIdea={onDeleteIdea}
      />

      <SketchCanvas
        isOpen={showSketchModal}
        onClose={handleCloseSketchModal}
        projectId={project.id}
        editingSketch={editingSketch}
      />
    </div>
  );
}

export default ProjectDetail;
