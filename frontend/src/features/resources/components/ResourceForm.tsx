import type { Resource } from '../../../shared/types/Project';

interface ResourceFormProps {
    isAdding: boolean;
    isEditing: boolean;
    formData: {
        title: string;
        url: string;
        description: string;
        category: Resource['category'];
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        url: string;
        description: string;
        category: Resource['category'];
    }>>;
    onSave: () => void;
    onCancel: () => void;
}

export function ResourceForm({
    isAdding,
    isEditing,
    formData,
    setFormData,
    onSave,
    onCancel
}: ResourceFormProps) {
    if (!isAdding) return null;

    return (
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
                <button onClick={onSave}>
                    💾 {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
                <button onClick={onCancel}>
                    ❌ Cancelar
                </button>
            </div>
        </div>
    );
}
