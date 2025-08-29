import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

interface ProjectListProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

function ProjectList({
  projects,
  onEditProject,
  onDeleteProject,
  selectedTag,
  setSelectedTag,
}: ProjectListProps) {
  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map(project => (
          <div key={project.id}>
            <div>
              <div>
                <Link to={`/project/${project.id}`}>
                  <h2>
                    📂 {project.name}
                  </h2>
                </Link>

                {project.tags && project.tags.length > 0 && (
                  <div>
                    {project.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTag(selectedTag === tag ? null : tag);
                        }}
                        title={selectedTag === tag ? `Quitar filtro de ${tag}` : `Filtrar por ${tag}`}
                      >
                        🏷️ {tag}
                      </button>
                    ))}
                  </div>
                )}

                {project.stack && project.stack.length > 0 && (
                  <div>
                    🛠️ Stack: {project.stack.join(', ')}
                  </div>
                )}

                {project.lastActivityDate && (
                  <div>
                    📅 Última actividad: {DateUtils.formatShort(project.lastActivityDate)}
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => onEditProject(project)}>
                  ✏️ Editar
                </button>
                <button onClick={() => onDeleteProject(project)}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectList;
