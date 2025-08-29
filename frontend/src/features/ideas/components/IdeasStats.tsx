interface IdeasStatsProps {
  stats: {
    total: number;
    inbox: number;
    processing: number;
    promoted: number;
    archived: number;
  };
}

function IdeasStats({ stats }: IdeasStatsProps) {
  return (
    <div>
      <div>
        <div>
          {stats.total}
        </div>
        <div>
          Total Ideas
        </div>
      </div>
      <div>
        <div>
          {stats.inbox}
        </div>
        <div>
          📥 Inbox
        </div>
      </div>
      <div>
        <div>
          {stats.processing}
        </div>
        <div>
          ⚙️ Procesando
        </div>
      </div>
      <div>
        <div>
          {stats.promoted}
        </div>
        <div>
          🚀 Promovidas
        </div>
      </div>
      <div>
        <div>
          {stats.archived}
        </div>
        <div>
          📦 Archivadas
        </div>
      </div>
    </div>
  );
}

export default IdeasStats;
