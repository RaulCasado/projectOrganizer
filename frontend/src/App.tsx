import { Routes, Route, useParams } from 'react-router-dom';
import { ProjectsMainView, ProjectDetail, TaskDetail, Dashboard, IdeasMainView } from './features';
import { ProjectsProvider, IdeasProvider, useProjects } from './contexts';
import { useNotifications } from './shared';
import type { Task } from './shared';  

function ProjectDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjects();
  
  const project = getProject(id!);
  
  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }
  
  return <ProjectDetail project={project} />;
}

function TaskDetailWrapper() {
  const { taskId } = useParams<{ taskId: string }>();
  const { projects } = useProjects();
  
  let foundTask: Task | undefined;

  for (const project of projects) {
    const task = project.tasks?.find((t: Task) => t.id === taskId);
    if (task) {
      foundTask = task;
      break;
    }
  }
  
  if (!foundTask) {
    return <div>Tarea no encontrada</div>;
  }
  
  return <TaskDetail task={foundTask} />;
}

function AppRoutes() {
  const { projects } = useProjects();
  
  useNotifications(projects);

  return (
    <Routes>
      <Route path="/" element={<ProjectsMainView />} />
      <Route path="/ideas" element={<IdeasMainView />} />
      <Route path="/project/:id" element={<ProjectDetailWrapper />} />
      <Route path="/tasks/:taskId" element={<TaskDetailWrapper />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <ProjectsProvider>
      <IdeasProvider>
        <div>
          <AppRoutes />
        </div>
      </IdeasProvider>
    </ProjectsProvider>
  );
}

export default App;
