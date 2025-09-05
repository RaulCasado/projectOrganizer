import { useState } from 'react';
import { useNotification } from '../../../shared';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

function MVPSection() {
  const { mvp, handleUpdateMVP } = useProjectDetailContext();
  const [isEditing, setIsEditing] = useState(false);
  const [mvpText, setMvpText] = useState(mvp || '');

  const { notifySuccess, notifyInfo } = useNotification();

  const handleSave = async () => {
    if (!mvpText.trim()) {
      notifyInfo('Por favor, define tu MVP antes de guardar');
      return;
    }

    handleUpdateMVP(mvpText.trim());
    setIsEditing(false);

    notifySuccess('Tu definición de MVP ha sido guardada exitosamente');
  };

  const handleCancel = () => {
    setMvpText(mvp || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <h3>🎯 Definir MVP (Minimum Viable Product)</h3>

        <textarea
          value={mvpText}
          onChange={e => setMvpText(e.target.value)}
          placeholder="Define tu MVP aquí... ¿Cuál es la versión más simple de tu producto que aporte valor?"
        />

        <div>
          <button onClick={handleSave}>💾 Guardar MVP</button>
          <button onClick={handleCancel}>❌ Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>🎯 MVP Definition</h3>
        <button onClick={() => setIsEditing(true)}>
          {mvp ? '✏️ Editar MVP' : '➕ Definir MVP'}
        </button>
      </div>

      {mvp ? (
        <div>
          <pre>{mvp}</pre>
        </div>
      ) : (
        <p>
          ⚠️ Aún no has definido el MVP para este proyecto.
          <br />
          <strong>Tip:</strong> El MVP te ayudará a enfocarte en las
          funcionalidades esenciales.
        </p>
      )}
    </div>
  );
}

export default MVPSection;
