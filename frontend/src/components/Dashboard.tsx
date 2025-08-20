import { Link } from 'react-router-dom';
import type { Project } from "../types/Project";

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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return projects
      .filter(p => p.lastActivityDate && new Date(p.lastActivityDate) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.lastActivityDate!).getTime() - new Date(a.lastActivityDate!).getTime())
      .slice(0, 5);
  };

  const getAbandonedProjects = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return projects
      .filter(p => p.lastActivityDate && new Date(p.lastActivityDate) < sevenDaysAgo)
      .sort((a, b) => new Date(a.lastActivityDate!).getTime() - new Date(b.lastActivityDate!).getTime())
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
    
    return allEntries
      .sort((a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime())
      .slice(0, 5);
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

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Dashboard General</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #90caf9'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>📂 Proyectos</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0d47a1' }}>
            {stats.totalProjects}
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #81c784'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>✅ Tareas</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1b5e20' }}>
            {stats.completedTasks}/{stats.totalTasks}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#388e3c' }}>
            {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% completado
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#fff3e0',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #ffb74d'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>📝 Blog</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e65100' }}>
            {stats.totalBlogEntries}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#f57c00' }}>entradas</div>
        </div>
        
        <div style={{
          backgroundColor: '#f3e5f5',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #ba68c8'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>⏱️ Tiempo</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a148c' }}>
            {stats.totalHours}h
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7b1fa2' }}>
            {stats.totalMinutes} minutos
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#ff6f00', marginBottom: '15px' }}>🔥 Proyectos más activos</h3>
            {activeProjects.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No hay actividad reciente</p>
            ) : (
              activeProjects.map(project => (
                <div key={project.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  <Link 
                    to={`/project/${project.id}`}
                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                  >
                    📂 {project.name}
                  </Link>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {getDaysAgo(project.lastActivityDate!) === 0 ? 'Hoy' : 
                     getDaysAgo(project.lastActivityDate!) === 1 ? 'Ayer' : 
                     `Hace ${getDaysAgo(project.lastActivityDate!)} días`}
                  </span>
                </div>
              ))
            )}
          </div>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h3 style={{ color: '#17a2b8', marginBottom: '15px' }}>🏷️ Tags más usados</h3>
            {popularTags.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No hay tags definidos</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <span key={tag} style={{
                    backgroundColor: '#e1f5fe',
                    color: '#01579b',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {tag} ({count})
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {abandonedProjects.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#f57c00', marginBottom: '15px' }}>⚠️ Proyectos que necesitan atención</h3>
              {abandonedProjects.map(project => (
                <div key={project.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '4px',
                  border: '1px solid #ffeaa7'
                }}>
                  <div>
                    <Link 
                      to={`/project/${project.id}`}
                      style={{ textDecoration: 'none', color: '#856404', fontWeight: 'bold' }}
                    >
                      💔 {project.name}
                    </Link>
                    <div style={{ fontSize: '0.7rem', color: '#856404' }}>
                      Sin actividad hace {getDaysAgo(project.lastActivityDate!)} días
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h3 style={{ color: '#28a745', marginBottom: '15px' }}>📝 Actividad reciente</h3>
            {recentActivity.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No hay actividad reciente</p>
            ) : (
              recentActivity.map(entry => (
                <div key={entry.id} style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  borderLeft: '3px solid #28a745'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Link 
                      to={`/project/${entry.projectId}`}
                      style={{ textDecoration: 'none', color: '#007bff' }}
                    >
                      {entry.projectName}
                    </Link>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#333', marginTop: '4px' }}>
                    "{entry.title}"
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px' }}>
                    {new Date(entry.date || entry.createdAt).toLocaleDateString()}
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

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '30px'
      }}>
        <h3 style={{ marginBottom: '15px' }}>🚀 Acciones rápidas</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link 
            to="/"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ➕ Nuevo Proyecto
          </Link>
          
          {projectsWithoutMVP.length > 0 && (
            <span style={{
              backgroundColor: '#ffc107',
              color: '#212529',
              padding: '10px 15px',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              🎯 {projectsWithoutMVP.length} proyectos sin MVP
            </span>
          )}
          
          <span style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            📊 {stats.totalResources} recursos guardados
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;