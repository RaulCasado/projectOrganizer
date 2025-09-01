import ProjectOverview from './ProjectOverview';
import TasksSection from './TasksSection';
import IdeasSection from './IdeasSection';
import ResourcesSection from './ResourcesSection';
import SketchesSection from './SketchesSection';
import BlogSection from './BlogSection';
import type { Project } from '../../../shared/types';
import { MVPSection } from './';
import SketchCanvas from '../../sketches/components/SketchCanvas';
import { ProjectDetailProvider, useProjectDetailContext } from '../../../contexts';

interface ProjectDetailProps {
  project: Project;
}

function ProjectDetailContent() {
  const { 
    project, 
    showSketchModal, 
    handleCloseSketchModal, 
    editingSketch 
  } = useProjectDetailContext();

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
        editingSketch={editingSketch ? {
          id: editingSketch.id,
          name: editingSketch.name,
          imageData: editingSketch.imageData
        } : undefined}
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