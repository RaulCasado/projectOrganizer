import { useProjectTasks } from '../hooks/useProjectTasks';
import { useProjectSketches } from '../../sketches/hooks/useProjectSketches';
import ProjectOverview from './ProjectOverview';
import TasksSection from './TasksSection';
import IdeasSection from './IdeasSection';
import ResourcesSection from './ResourcesSection';
import SketchesSection from './SketchesSection';
import BlogSection from './BlogSection';
import type { Project, BlogEntry, Resource } from '../../../shared/types';
import type { Idea } from '../../../shared/types/Idea';
import { MVPSection } from './';
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

      <ResourcesSection
        resources={project.resources || []}
        onUpdateResources={handleUpdateResources}
      />

      <BlogSection
        blogEntries={project.blogEntries || []}
        onUpdateBlogEntries={handleUpdateBlogEntries}
        project={project}
      />

      <SketchesSection
        sketches={sketches}
        error={sketchesError}
        sketchCount={sketchCount}
        maxSketches={maxSketches}
        isAtLimit={isAtLimit}
        onEditSketch={handleEditSketch}
        onDeleteSketch={handleDeleteSketch}
        onOpenSketchModal={handleOpenSketchModal}
      />

      <TasksSection
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        filteredTasks={filteredTasks}
        handleUpdateTask={handleUpdateTask}
        handleAddTask={handleAddTask}
        handleToggleTask={handleToggleTask}
        handleDeleteTask={handleDeleteTask}
        handleCancelEdit={handleCancelEdit}
      />

      <IdeasSection
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
