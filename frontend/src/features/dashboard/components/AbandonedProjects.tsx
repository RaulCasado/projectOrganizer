import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

interface AbandonedProjectsProps {
  abandonedProjects: Project[];
}

function AbandonedProjects({ abandonedProjects }: AbandonedProjectsProps) {
  if (abandonedProjects.length === 0) return null;

  return (
    <div>
      <h3>⚠️ Proyectos que necesitan atención</h3>
      {abandonedProjects.map(project => (
        <div key={project.id}>
          <div>
            <Link to={`/project/${project.id}`}>
              💔 {project.name}
            </Link>
            <div>
              Sin actividad hace {DateUtils.daysSince(project.lastActivityDate!)} días
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AbandonedProjects;
