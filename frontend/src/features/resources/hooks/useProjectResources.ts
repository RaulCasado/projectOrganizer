import { useState } from 'react';
import type { Resource } from '../../../shared/types/Project';
import { useNotification } from '../../../shared';
import { DateUtils } from '../../../shared';

interface UseProjectResourcesProps {
  resources?: Resource[];
  onUpdateResources: (resources: Resource[]) => void;
}

export function useProjectResources({
  resources = [],
  onUpdateResources,
}: UseProjectResourcesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'documentation' as Resource['category'],
  });

  const isEditing = !!editingResource;
  const { notifySuccess, confirmDelete, notifyInfo } = useNotification();

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      url: resource.url,
      description: resource.description || '',
      category: resource.category,
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      notifyInfo('Error', 'Título y URL son obligatorios');
      return;
    }

    if (isEditing) {
      const updatedResource: Resource = {
        ...editingResource!,
        title: formData.title.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        category: formData.category,
      };

      const updatedResources = resources.map(resource =>
        resource.id === editingResource!.id ? updatedResource : resource
      );

      onUpdateResources(updatedResources);
      notifySuccess('¡Actualizado!', 'Recurso actualizado correctamente');
    } else {
      const newResource: Resource = {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        category: formData.category,
        createdAt: DateUtils.timestampNow(),
      };

      onUpdateResources([...resources, newResource]);
      notifySuccess('¡Añadido!', 'Recurso guardado correctamente');
    }

    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'documentation',
    });
    setIsAdding(false);
    setEditingResource(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingResource(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'documentation',
    });
  };

  const handleDelete = async (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    const result = await confirmDelete('recurso', resource.title);

    if (result) {
      onUpdateResources(resources.filter(r => r.id !== resourceId));
      if (editingResource?.id === resourceId) {
        handleCancel();
      }
      notifySuccess('¡Eliminado!', 'Recurso eliminado');
    }
  };

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

  return {
    isAdding,
    setIsAdding,
    isEditing,
    formData,
    setFormData,
    handleEditResource,
    handleSave,
    handleCancel,
    handleDelete,
    getCategoryIcon,
    resources,
  };
}
