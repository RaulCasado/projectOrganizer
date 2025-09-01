import IdeaPanel from './IdeaPanel';
import IdeasHeader from './IdeasHeader';
import IdeasStats from './IdeasStats';
import IdeasFilters from './IdeasFilters';
import { useIdeasWithProjects } from '../../../contexts';
import { IdeasMainViewProvider } from '../../../contexts/IdeasMainViewContext';

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