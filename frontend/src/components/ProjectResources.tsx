import { useState } from 'react';
import type { Resource } from '../types/Project';
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
        <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px', 
            marginTop: '20px' 
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>🔗 Recursos del Proyecto</h3>
                {!isAdding && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        style={{
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ➕ Añadir Recurso
                    </button>
                )}
            </div>

            {isAdding && (
                <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '15px', 
                    borderRadius: '4px', 
                    margin: '15px 0' 
                }}>
                    <h4>{isEditing ? 'Editar' : 'Nuevo'} Recurso</h4>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Título del recurso"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="url"
                            placeholder="https://ejemplo.com"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Descripción (opcional)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Resource['category'] })}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="documentation">📚 Documentación</option>
                            <option value="tutorial">🎓 Tutorial</option>
                            <option value="tool">🔧 Herramienta</option>
                            <option value="inspiration">💡 Inspiración</option>
                            <option value="other">📎 Otro</option>
                        </select>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            onClick={handleSave}
                            style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            💾 {isEditing ? 'Actualizar' : 'Guardar'}
                        </button>
                        <button 
                            onClick={handleCancel}
                            style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                {resources.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <h4>📎 Sin recursos aún</h4>
                        <p>Añade enlaces útiles, documentación o tutoriales para este proyecto</p>
                    </div>
                ) : (
                    <div>
                        {resources.map(resource => (
                            <div key={resource.id} style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '4px',
                                padding: '15px',
                                margin: '10px 0',
                                backgroundColor: 'black'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 8px 0' }}>
                                            {getCategoryIcon(resource.category)} {resource.title}
                                        </h4>
                                        <div style={{ marginBottom: '8px' }}>
                                            <a 
                                                href={resource.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{ color: '#007bff', textDecoration: 'none' }}
                                            >
                                                🔗 {resource.url}
                                            </a>
                                        </div>
                                        {resource.description && (
                                            <p style={{ color: '#666', margin: '8px 0', fontSize: '0.9rem' }}>
                                                {resource.description}
                                            </p>
                                        )}
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                            Añadido: {new Date(resource.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <button 
                                            onClick={() => handleEditResource(resource)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                                            title="Editar recurso"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(resource.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
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
