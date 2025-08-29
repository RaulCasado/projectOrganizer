import type { Resource } from '../../../shared/types/Project';
import { DateUtils } from '../../../shared';

interface ResourceListProps {
    resources: Resource[];
    getCategoryIcon: (category: Resource['category']) => string;
    onEditResource: (resource: Resource) => void;
    onDeleteResource: (resourceId: string) => void;
}

export function ResourceList({
    resources,
    getCategoryIcon,
    onEditResource,
    onDeleteResource
}: ResourceListProps) {
    if (resources.length === 0) {
        return (
            <div>
                <h4>📎 Sin recursos aún</h4>
                <p>Añade enlaces útiles, documentación o tutoriales para este proyecto</p>
            </div>
        );
    }

    return (
        <div>
            {resources.map(resource => (
                <div key={resource.id}>
                    <div>
                        <div>
                            <h4>
                                {getCategoryIcon(resource.category)} {resource.title}
                            </h4>
                            <div>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🔗 {resource.url}
                                </a>
                            </div>
                            {resource.description && (
                                <p>
                                    {resource.description}
                                </p>
                            )}
                            <div>
                                Añadido: {DateUtils.formatShort(resource.createdAt)}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => onEditResource(resource)}
                                title="Editar recurso"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDeleteResource(resource.id)}
                                title="Eliminar recurso"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
