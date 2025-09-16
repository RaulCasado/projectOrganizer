import { Link } from 'react-router-dom';
import { useProjectsMainViewLogic } from '../hooks/useProjectsMainViewLogic';
import { useProjects } from '../../../contexts';
import { ProjectFilters, ProjectForm, ProjectList } from './';
import styles from './projects.module.css';

function ProjectsMainView() {
  const { projects, deleteProject, setEditingProject } = useProjects();
  const {
    selectedTag,
    setSelectedTag,
    availableTags,
    filteredProjects,
    handleDeleteProject,
  } = useProjectsMainViewLogic({
    projects,
    onDeleteProject: deleteProject,
  });

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link to="/dashboard" className={styles.navLink}>
          📊 Dashboard
        </Link>
        <Link to="/ideas" className={styles.navLink}>
          💡 Ideas
        </Link>
      </div>

      <ProjectForm />

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
