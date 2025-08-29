interface StatsCardsProps {
  stats: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalBlogEntries: number;
    totalResources: number;
    totalMinutes: number;
    totalHours: number;
  };
}

function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div>
      <div>
        <h3>📂 Proyectos</h3>
        <div>
          {stats.totalProjects}
        </div>
      </div>

      <div>
        <h3>✅ Tareas</h3>
        <div>
          {stats.completedTasks}/{stats.totalTasks}
        </div>
        <div>
          {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% completado
        </div>
      </div>

      <div>
        <h3>📝 Blog</h3>
        <div>
          {stats.totalBlogEntries}
        </div>
        <div>entradas</div>
      </div>

      <div>
        <h3>⏱️ Tiempo</h3>
        <div>
          {stats.totalHours}h
        </div>
        <div>
          {stats.totalMinutes} minutos
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
