import { useIdeasWithProjects, IdeasMainViewProvider } from '../../../contexts';
import { IdeaPanel, IdeasHeader, IdeasStats, IdeasFilters } from './';
import styles from './ideas.module.css';

function IdeasMainViewContent() {
  return (
    <div className={styles.container}>
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
