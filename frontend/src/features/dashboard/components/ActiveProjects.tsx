import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

interface ActiveProjectsProps {
  activeProjects: Project[];
}

function ActiveProjects({ activeProjects }: ActiveProjectsProps) {
  return (
    <div>
      <h3>🔥 Proyectos más activos</h3>
      {activeProjects.length === 0 ? (
        <p>No hay actividad reciente</p>
      ) : (
        activeProjects.map(project => (
          <div key={project.id}>
            <Link to={`/project/${project.id}`}>📂 {project.name}</Link>
            <span>{DateUtils.getRelativeLabel(project.lastActivityDate!)}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default ActiveProjects;
