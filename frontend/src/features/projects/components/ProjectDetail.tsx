import type { Project } from '../../../shared';
import { SketchCanvas } from '../../../features';
import {
  ProjectDetailProvider,
  useProjectDetailContext,
} from '../../../contexts';
import {
  ProjectOverview,
  TasksSection,
  IdeasSection,
  ResourcesSection,
  SketchesSection,
  BlogSection,
  MVPSection,
} from './';

interface ProjectDetailProps {
  project: Project;
}

function ProjectDetailContent() {
  const { project, showSketchModal, handleCloseSketchModal, editingSketch } =
    useProjectDetailContext();

  return (
    <div>
      <ProjectOverview />
      <MVPSection />
      <ResourcesSection />
      <BlogSection />
      <SketchesSection />
      <TasksSection />
      <IdeasSection />
      <SketchCanvas
        isOpen={showSketchModal}
        onClose={handleCloseSketchModal}
        projectId={project.id}
        editingSketch={
          editingSketch
            ? {
                id: editingSketch.id,
                name: editingSketch.name,
                imageData: editingSketch.imageData,
              }
            : undefined
        }
      />
    </div>
  );
}

function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <ProjectDetailProvider project={project}>
      <ProjectDetailContent />
    </ProjectDetailProvider>
  );
}

export default ProjectDetail;
