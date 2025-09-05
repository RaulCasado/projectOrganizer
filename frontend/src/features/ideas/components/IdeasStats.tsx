import { useIdeasMainViewContext } from '../../../contexts/IdeasMainViewContext';

function IdeasStats() {
  const { stats } = useIdeasMainViewContext();

  return (
    <div>
      <h3>📊 Estadísticas</h3>
      <div>
        <span>📥 Inbox: {stats.inbox}</span>
        <span>⚙️ Procesando: {stats.processing}</span>
        <span>🚀 Promovidas: {stats.promoted}</span>
        <span>📦 Archivadas: {stats.archived}</span>
        <span>🔢 Total: {stats.total}</span>
      </div>
    </div>
  );
}

export default IdeasStats;
