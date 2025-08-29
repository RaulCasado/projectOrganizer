import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

interface DashboardProps {
  projects: Project[];
}

function Dashboard({ projects }: DashboardProps) {
  const getTotalStats = () => {
    const totalTasks = projects.flatMap(p => p.tasks || []).length;
    const completedTasks = projects.flatMap(p => p.tasks || []).filter(t => t.completed).length;
    const totalBlogEntries = projects.flatMap(p => p.blogEntries || []).length;
    const totalResources = projects.flatMap(p => p.resources || []).length;
    
    const totalMinutes = projects
      .flatMap(p => p.blogEntries || [])
      .reduce((sum, entry) => sum + (entry.timeSpent || 0), 0);
    
    return {
      totalProjects: projects.length,
      totalTasks,
      completedTasks,
      totalBlogEntries,
      totalResources,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10
    };
  };

  const getActiveProjects = () => {
    return DateUtils.sortByDate(
      DateUtils.filterRecentDays(projects, 7, 'lastActivityDate'),
      'lastActivityDate',
      'desc'
    ).slice(0, 5);
  };

  const getAbandonedProjects = () => {
    return projects
      .filter(p => p.lastActivityDate && DateUtils.isOlderThan(p.lastActivityDate, 7))
      .sort((a, b) => DateUtils.daysSince(a.lastActivityDate!) - DateUtils.daysSince(b.lastActivityDate!))
      .slice(0, 3);
  };

  const getPopularTags = () => {
    const tagCounts: { [key: string]: number } = {};
    
    projects.forEach(project => {
      project.tags?.forEach(tag => {
        if (tag.trim()) {
          tagCounts[tag.trim()] = (tagCounts[tag.trim()] || 0) + 1;
        }
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8);
  };

  const getRecentActivity = () => {
    const allEntries = projects.flatMap(project => 
      (project.blogEntries || []).map(entry => ({
        ...entry,
        projectName: project.name,
        projectId: project.id
      }))
    );
    
    const entriesWithDates = allEntries.map(entry => ({
        ...entry,
        sortDate: entry.date || entry.createdAt
      }));
      
      return DateUtils.sortByDate(entriesWithDates, 'sortDate', 'desc').slice(0, 5);
  };

  const getProjectsWithoutMVP = () => {
    return projects.filter(p => !p.mvp || p.mvp.trim() === '');
  };

  const stats = getTotalStats();
  const activeProjects = getActiveProjects();
  const abandonedProjects = getAbandonedProjects();
  const popularTags = getPopularTags();
  const recentActivity = getRecentActivity();
  const projectsWithoutMVP = getProjectsWithoutMVP();

  return (
    <div>
      <h1>📊 Dashboard General</h1>
      
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

      <div>
        <div>
          <div>
            <h3>🔥 Proyectos más activos</h3>
            {activeProjects.length === 0 ? (
              <p>No hay actividad reciente</p>
            ) : (
              activeProjects.map(project => (
                <div key={project.id}>
                  <Link 
                    to={`/project/${project.id}`}
                  >
                    📂 {project.name}
                  </Link>
                  <span>
                    {DateUtils.getRelativeLabel(project.lastActivityDate!)}
                  </span>
                </div>
              ))
            )}
          </div>
          <div>
            <h3>🏷️ Tags más usados</h3>
            {popularTags.length === 0 ? (
              <p>No hay tags definidos</p>
            ) : (
              <div>
                {popularTags.map(([tag, count]) => (
                  <span key={tag}>
                    {tag} ({count})
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {abandonedProjects.length > 0 && (
            <div>
              <h3>⚠️ Proyectos que necesitan atención</h3>
              {abandonedProjects.map(project => (
                <div key={project.id}>
                  <div>
                    <Link 
                      to={`/project/${project.id}`}
                    >
                      💔 {project.name}
                    </Link>
                    <div>
                      Sin actividad hace {DateUtils.daysSince(project.lastActivityDate!)} días
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h3>📝 Actividad reciente</h3>
            {recentActivity.length === 0 ? (
              <p>No hay actividad reciente</p>
            ) : (
              recentActivity.map(entry => (
                <div key={entry.id}>
                  <div>
                    <Link 
                      to={`/project/${entry.projectId}`}
                    >
                      {entry.projectName}
                    </Link>
                  </div>
                  <div>
                    "{entry.title}"
                  </div>
                  <div>
                    { DateUtils.formatShort(entry.date || entry.createdAt)}
                    {entry.timeSpent && entry.timeSpent > 0 && (
                      <span> • {entry.timeSpent} min</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        <h3>🚀 Acciones rápidas</h3>
        <div>
          <Link 
            to="/"
          >
            ➕ Nuevo Proyecto
          </Link>
          
          {projectsWithoutMVP.length > 0 && (
            <span>
              🎯 {projectsWithoutMVP.length} proyectos sin MVP
            </span>
          )}
          
          <span>
            📊 {stats.totalResources} recursos guardados
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;