import React from 'react';

interface ExpandedFormProps {
  description: string;
  setDescription: (description: string) => void;
  priority: 'low' | 'medium' | 'high';
  setPriority: (priority: 'low' | 'medium' | 'high') => void;
  category: 'feature' | 'project' | 'improvement' | 'research' | 'other';
  setCategory: (category: 'feature' | 'project' | 'improvement' | 'research' | 'other') => void;
  tags: string;
  setTags: (tags: string) => void;
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function ExpandedForm({
  description,
  setDescription,
  priority,
  setPriority,
  category,
  setCategory,
  tags,
  setTags,
  title,
  onSubmit,
  onCancel,
}: ExpandedFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <label>
            Prioridad:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
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
            value={category}
            onChange={(e) => setCategory(e.target.value as 'feature' | 'project' | 'improvement' | 'research' | 'other')}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="frontend, ui, mejora, ..."
        />
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
          disabled={!title.trim()}
        >
          Crear Idea
        </button>
      </div>
    </form>
  );
}

export default ExpandedForm;
