import { useForm } from '../../../shared/hooks/useForm';
import type { IdeaFormData } from '../../../shared/types/Idea';
interface ExpandedFormProps {
  title: string;
  onSubmit: (formData: IdeaFormData) => void;
  onCancel: () => void;
}

function ExpandedForm({
  title,
  onSubmit,
  onCancel,
}: ExpandedFormProps) {
  const validationSchema = {
    description: (value: string) => 
      value.length < 10 ? 'Descripción muy corta (10 caracteres mínimo)' : undefined,
  }

  const {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit
  } = useForm({
    description : '',
    priority : 'medium' as const,
    category : 'feature' as const,
    tags : ''
  },validationSchema);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(() => onSubmit({title, ...values}));
    }}>
      <div>
        <div>
          <label>
            Prioridad:
          </label>
          <select
            value={values.priority}
            onChange={(e) => setFieldValue('priority', e.target.value as any)}
          >
            <option value="low">🟢 Baja</option>
            <option value="medium">🟡 Media</option>
            <option value="high">🔴 Alta</option>
          </select>
        </div>

        <div>
          <label>
            Categoría:
          </label>
          <select
            value={values.category}
            onChange={(e) => setFieldValue('category',e.target.value as any)}
          >
            <option value="feature">✨ Feature</option>
            <option value="project">🚀 Proyecto</option>
            <option value="improvement">⚡ Mejora</option>
            <option value="research">🔍 Investigación</option>
            <option value="other">📝 Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label>
          Descripción:
        </label>
        <textarea
          value={values.description}
          onChange={(e) => setFieldValue('description',e.target.value)}
          placeholder="Describe tu idea con más detalle..."
          rows={3}
        />
      </div>

      <div>
        <label>
          Tags (separados por comas):
        </label>
        <input
          type="text"
          value={values.tags}
          onChange={(e) => setFieldValue('tags',e.target.value)}
          placeholder="frontend, ui, mejora, ..."
        />
      </div>
      <div>
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div>
        <button
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...': 'Crear Idea'}
        </button>
      </div>
    </form>
  );
}

export default ExpandedForm;
