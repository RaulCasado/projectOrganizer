import { useState } from 'react';
import { useNotification } from '../../../shared';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';
import styles from './MVPSection.module.css';

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
      <div className={styles.editForm}>
        <h3 className={styles.title}>
          🎯 Definir MVP (Minimum Viable Product)
        </h3>

        <textarea
          className={styles.textarea}
          value={mvpText}
          onChange={e => setMvpText(e.target.value)}
          placeholder="Define tu MVP aquí... ¿Cuál es la versión más simple de tu producto que aporte valor?"
        />

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleSave}
          >
            💾 Guardar MVP
          </button>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={handleCancel}
          >
            ❌ Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>🎯 MVP Definition</h3>
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={() => setIsEditing(true)}
        >
          {mvp ? '✏️ Editar MVP' : '➕ Definir MVP'}
        </button>
      </div>

      {mvp ? (
        <div className={styles.content}>
          <pre className={styles.mvpText}>{mvp}</pre>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⚠️</div>
          <p className={styles.emptyMessage}>
            Aún no has definido el MVP para este proyecto.
            <br />
            <strong>Tip:</strong> El MVP te ayudará a enfocarte en las
            funcionalidades esenciales.
          </p>
        </div>
      )}
    </div>
  );
}

export default MVPSection;
