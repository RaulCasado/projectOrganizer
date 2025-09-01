import ProjectsMainView from './features/projects/components/ProjectsMainView';
import { Routes, Route } from 'react-router-dom';
import ProjectDetail from './features/projects/components/ProjectDetail';
import { useParams } from 'react-router-dom';
import {TaskDetail} from './features/tasks/components/TaskDetail';
import type { Task } from './shared/types/Task';
import Dashboard from './features/dashboard/components/Dashboard';
import { useNotifications } from './shared/hooks';
import IdeasMainView from './features/ideas/components/IdeasMainView';
import { ProjectsProvider, IdeasProvider, useProjects } from './contexts';

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
