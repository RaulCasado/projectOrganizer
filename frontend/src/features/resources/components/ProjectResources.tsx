import type { Resource } from '../../../shared/types/Project';
import { useProjectResources } from '../hooks/useProjectResources';
import { ResourceForm } from './ResourceForm';
import { ResourceList } from './ResourceList';

interface ProjectResourcesProps {
    resources?: Resource[];
    onUpdateResources: (resources: Resource[]) => void;
}

function ProjectResources({ resources = [], onUpdateResources }: ProjectResourcesProps) {
    const {
        isAdding,
        setIsAdding,
        isEditing,
        formData,
        setFormData,
        handleEditResource,
        handleSave,
        handleCancel,
        handleDelete,
        getCategoryIcon
    } = useProjectResources({ resources, onUpdateResources });

    return (
        <div>
            <div>
                <h3>🔗 Recursos del Proyecto</h3>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                    >
                        ➕ Añadir Recurso
                    </button>
                )}
            </div>

            <ResourceForm
                isAdding={isAdding}
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <div>
                <ResourceList
                    resources={resources}
                    getCategoryIcon={getCategoryIcon}
                    onEditResource={handleEditResource}
                    onDeleteResource={handleDelete}
                />
            </div>
        </div>
    );
}

export default ProjectResources;
