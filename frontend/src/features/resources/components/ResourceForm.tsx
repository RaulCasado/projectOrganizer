import { useProjectDetailContext } from '../../../contexts';
import type { ResourceFormData } from '../../../shared';

interface ResourceFormProps {
  isVisible?: boolean;
  onCancel?: () => void;
}

export function ResourceForm({
  isVisible = true,
  onCancel,
}: ResourceFormProps) {
  const {
    resourceForm,
    editingResource,
    handleAddResource,
    handleUpdateResource,
    setEditingResource,
  } = useProjectDetailContext();

  const { values, errors, isSubmitting, setFieldValue, handleSubmit } =
    resourceForm;
  const isEditing = !!editingResource;

  if (!isVisible) return null;

  const onSubmitHandler = async (formData: ResourceFormData) => {
    if (isEditing && editingResource) {
      handleUpdateResource({
        ...editingResource,
        ...formData,
      });
    } else {
      handleAddResource(formData);
      resourceForm.resetForm();
    }

    if (onCancel) {
      onCancel();
    }
  };

  const handleCancel = () => {
    setEditingResource(undefined);
    resourceForm.resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <h4>{isEditing ? 'Editar' : 'Nuevo'} Recurso</h4>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmitHandler);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Título del recurso"
            value={values.title}
            onChange={e => setFieldValue('title', e.target.value)}
            disabled={isSubmitting}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div>
          <input
            type="url"
            placeholder="https://ejemplo.com"
            value={values.url}
            onChange={e => setFieldValue('url', e.target.value)}
            disabled={isSubmitting}
            required
          />
          {errors.url && <span className="error">{errors.url}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={values.description}
            onChange={e => setFieldValue('description', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <div>
          <select
            value={values.category}
            onChange={e =>
              setFieldValue(
                'category',
                e.target.value as ResourceFormData['category']
              )
            }
            disabled={isSubmitting}
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
            type="submit"
            disabled={
              isSubmitting || !values.title.trim() || !values.url.trim()
            }
          >
            {isSubmitting
              ? isEditing
                ? 'Actualizando...'
                : 'Guardando...'
              : isEditing
                ? '💾 Actualizar'
                : '💾 Guardar'}
          </button>
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
