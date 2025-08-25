import { useState } from 'react';
import type { Resource } from '../../../shared/types/Project';
import Swal from 'sweetalert2';

interface ProjectResourcesProps {
    resources?: Resource[];
    onUpdateResources: (resources: Resource[]) => void;
}

function ProjectResources({ resources = [], onUpdateResources }: ProjectResourcesProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: '',
        category: 'documentation' as Resource['category']
    });

    const isEditing = !!editingResource;

    const handleEditResource = (resource: Resource) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title,
            url: resource.url,
            description: resource.description || '',
            category: resource.category
        });
        setIsAdding(true);
    };

    const handleSave = () => {
        if (!formData.title.trim() || !formData.url.trim()) {
            Swal.fire('Error', 'Título y URL son obligatorios', 'error');
            return;
        }

        if (isEditing) {
            const updatedResource: Resource = {
                ...editingResource,
                title: formData.title.trim(),
                url: formData.url.trim(),
                description: formData.description.trim(),
                category: formData.category,
            };

            const updatedResources = resources.map(resource => 
                resource.id === editingResource.id ? updatedResource : resource
            );

            onUpdateResources(updatedResources);
            Swal.fire('¡Actualizado!', 'Recurso actualizado correctamente', 'success');
        } else {
            const newResource: Resource = {
                id: crypto.randomUUID(),
                title: formData.title.trim(),
                url: formData.url.trim(),
                description: formData.description.trim(),
                category: formData.category,
                createdAt: new Date().toISOString()
            };

            onUpdateResources([...resources, newResource]);
            Swal.fire('¡Añadido!', 'Recurso guardado correctamente', 'success');
        }
        
        setFormData({ title: '', url: '', description: '', category: 'documentation' });
        setIsAdding(false);
        setEditingResource(null);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingResource(null);
        setFormData({ title: '', url: '', description: '', category: 'documentation' });
    };

    const handleDelete = async (resourceId: string) => {
        const resource = resources.find(r => r.id === resourceId);
        if (!resource) return;

        const result = await Swal.fire({
            title: '¿Eliminar recurso?',
            text: `¿Seguro que quieres eliminar "${resource.title}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            onUpdateResources(resources.filter(r => r.id !== resourceId));
            if (editingResource?.id === resourceId) {
                handleCancel();
            }
            Swal.fire('¡Eliminado!', 'Recurso eliminado', 'success');
        }
    };

    const getCategoryIcon = (category: Resource['category']) => {
        const icons = {
            documentation: '📚',
            tutorial: '🎓',
            tool: '🔧',
            inspiration: '💡',
            other: '📎'
        };
        return icons[category];
    };

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

            {isAdding && (
                <div>
                    <h4>{isEditing ? 'Editar' : 'Nuevo'} Recurso</h4>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Título del recurso"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="url"
                            placeholder="https://ejemplo.com"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Descripción (opcional)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    
                    <div>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Resource['category'] })}
                        >
                            <option value="documentation">📚 Documentación</option>
                            <option value="tutorial">🎓 Tutorial</option>
                            <option value="tool">🔧 Herramienta</option>
                            <option value="inspiration">💡 Inspiración</option>
                            <option value="other">📎 Otro</option>
                        </select>
                    </div>
                    
                    <div>
                        <button 
                            onClick={handleSave}
                        >
                            💾 {isEditing ? 'Actualizar' : 'Guardar'}
                        </button>
                        <button 
                            onClick={handleCancel}
                        >
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div>
                {resources.length === 0 ? (
                    <div>
                        <h4>📎 Sin recursos aún</h4>
                        <p>Añade enlaces útiles, documentación o tutoriales para este proyecto</p>
                    </div>
                ) : (
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
                                            Añadido: {new Date(resource.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <button 
                                            onClick={() => handleEditResource(resource)}
                                            title="Editar recurso"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(resource.id)}
                                            title="Eliminar recurso"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectResources;
