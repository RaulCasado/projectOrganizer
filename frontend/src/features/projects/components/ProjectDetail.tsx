import { useProjectTasks } from '../hooks/useProjectTasks';
import { useProjectSketches } from '../../sketches/hooks/useProjectSketches';
import SketchesGrid from '../../sketches/components/SketchesGrid';
import ProjectOverview from './ProjectOverview';
import type { Project, BlogEntry, Resource } from '../../../shared/types';
import type { Idea } from '../../../shared/types/Idea';
import { TaskList, TaskForm, TaskFilters } from '../../tasks/components';
import { ProjectBlog } from '../../blog/components';
import { ProjectResources } from '../../resources/components';
import { MVPSection } from './';
import { IdeaPanel } from '../../ideas/components';
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

  const {
    sketches,
    editingSketch,
    showSketchModal,
    error: sketchesError,
    handleOpenSketchModal,
    handleCloseSketchModal,
    handleEditSketch,
    handleDeleteSketch,
    sketchCount,
    maxSketches,
    isAtLimit,
  } = useProjectSketches(project.id);

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

  return (
    <div>
      <ProjectOverview project={project} />

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
        </div>

        <SketchesGrid
          sketches={sketches}
          error={sketchesError}
          sketchCount={sketchCount}
          maxSketches={maxSketches}
          isAtLimit={isAtLimit}
          onEditSketch={handleEditSketch}
          onDeleteSketch={handleDeleteSketch}
          onOpenSketchModal={handleOpenSketchModal}
        />

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
        editingSketch={editingSketch || undefined}
      />
    </div>
  );
}

export default ProjectDetail;
