import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';

interface QuickActionsProps {
  projectsWithoutMVP: Project[];
  totalResources: number;
}

function QuickActions({
  projectsWithoutMVP,
  totalResources,
}: QuickActionsProps) {
  return (
    <div>
      <h3>🚀 Acciones rápidas</h3>
      <div>
        <Link to="/">➕ Nuevo Proyecto</Link>

        {projectsWithoutMVP.length > 0 && (
          <span>🎯 {projectsWithoutMVP.length} proyectos sin MVP</span>
        )}

        <span>📊 {totalResources} recursos guardados</span>
      </div>
    </div>
  );
}

export default QuickActions;
