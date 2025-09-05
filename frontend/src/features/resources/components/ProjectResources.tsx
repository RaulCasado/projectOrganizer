import type { Resource } from '../../../shared/types/Project';
import { useProjectDetailContext } from '../../../contexts';
import { ResourceList, ResourceForm } from './';
import { useState } from 'react';

function ProjectResources() {
  const {
    resources,
    editingResource,
    setEditingResource,
    handleDeleteResource,
  } = useProjectDetailContext();

  const [isAdding, setIsAdding] = useState(false);

  const getCategoryIcon = (category: Resource['category']) => {
    const icons = {
      documentation: '📚',
      tutorial: '🎓',
      tool: '🔧',
      inspiration: '💡',
      other: '📎',
    };
    return icons[category];
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingResource(undefined);
  };

  const showForm = isAdding || !!editingResource;

  return (
    <div>
      <div>
        <h3>🔗 Recursos del Proyecto</h3>
        {!showForm && (
          <button onClick={() => setIsAdding(true)}>➕ Añadir Recurso</button>
        )}
      </div>

      <ResourceForm isVisible={showForm} onCancel={handleCancel} />

      <div>
        <ResourceList
          resources={resources}
          getCategoryIcon={getCategoryIcon}
          onEditResource={handleEditResource}
          onDeleteResource={handleDeleteResource}
        />
      </div>
    </div>
  );
}

export default ProjectResources;
