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
import { useProjectTabs } from '../hooks';
import styles from './projects.module.css';

interface ProjectDetailProps {
  project: Project;
}

function ProjectDetailContent() {
  const {
    project,
    showSketchModal,
    handleCloseSketchModal,
    editingSketch,
    refreshSketches,
  } = useProjectDetailContext();

  const { activeTab, setActiveTab, tabs, getActiveTabComponent } =
    useProjectTabs();

  const tabComponents = {
    overview: <ProjectOverview />,
    mvp: <MVPSection />,
    tasks: <TasksSection />,
    ideas: <IdeasSection />,
    resources: <ResourcesSection />,
    sketches: <SketchesSection />,
    blog: <BlogSection />,
  };

  return (
    <div>
      <div className={styles.projectHeader}>
        <h1 className={styles.projectTitle}>{project.name}</h1>

        <nav className={styles.tabsNavigation}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.tabContent}>
        {getActiveTabComponent(tabComponents)}
      </div>

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
        onSketchSaved={refreshSketches}
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
