import { useIdeasWithProjects, IdeasMainViewProvider } from '../../../contexts';
import { IdeaPanel, IdeasHeader, IdeasStats, IdeasFilters } from './';

function IdeasMainViewContent() {
  return (
    <div>
      <IdeasHeader />
      <IdeasStats />
      <IdeasFilters />
      <IdeaPanel />
    </div>
  );
}

function IdeasMainView() {
  const { ideas } = useIdeasWithProjects();

  return (
    <IdeasMainViewProvider ideas={ideas}>
      <IdeasMainViewContent />
    </IdeasMainViewProvider>
  );
}

export default IdeasMainView;
