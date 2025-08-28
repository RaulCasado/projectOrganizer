import { useState } from 'react'
import type { Project, BlogEntry, Resource } from '../../../shared/types';
import type { Idea } from '../../../shared/types/Idea';
import type { Task } from '../../../shared/types/Task';
import { TaskList, TaskForm, TaskFilters } from '../../tasks/components';
import { ProjectBlog } from '../../blog/components';
import { ProjectResources } from '../../resources/components';
import { MVPSection } from './';
import { IdeaPanel } from '../../ideas/components';
import { useSketches } from '../../../shared/hooks/useSketches';
import SketchCanvas from '../../sketches/components/SketchCanvas';

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

  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchText, setSearchText] = useState('');

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

  const getFilteredTasks = () => {
        if (!project.tasks) return [];

        return project.tasks.filter(task => {
            if (statusFilter === 'completed' && !task.completed) return false;
            if (statusFilter === 'pending' && task.completed) return false;

            if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

            if (searchText) {
                const searchLower = searchText.toLowerCase();
                const titleMatch = task.title.toLowerCase().includes(searchLower);
                const descriptionMatch = task.description?.toLowerCase().includes(searchLower) || false;
                if (!titleMatch && !descriptionMatch) return false;
            }

            return true;
        });
    };

  const handleUpdateResources = (resources: Resource[]) => {
    const updatedProject = {
      ...project,
      resources,
      lastActivityDate: new Date().toISOString().split('T')[0]
    };
    onUpdateProject(updatedProject);
  };

  const handleUpdateBlogEntries = (blogEntries: BlogEntry[]) => {
    onUpdateProject({
      ...project,
      blogEntries,
      lastActivityDate: new Date().toISOString().split('T')[0]
    });
  };
  const filteredTasks = getFilteredTasks();

  const handleUpdateMVP = (mvp: string) => {
    onUpdateProject({
      ...project,
      mvp
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
    });

    setEditingTask(undefined);
  };

  const handleCancelEdit = () => {
    setEditingTask(undefined);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...taskData,
    };

    const updatedProject = {
      ...project,
      tasks: [...(project.tasks || []), newTask],
    };
    
    onUpdateProject(updatedProject);
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    );
    
    onUpdateProject({
      ...project,
      tasks: updatedTasks,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = (project.tasks || []).filter(task => task.id !== taskId);
    onUpdateProject({
      ...project,
      tasks: updatedTasks,
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
                      {new Date(sketch.createdAt).toLocaleDateString()}
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
