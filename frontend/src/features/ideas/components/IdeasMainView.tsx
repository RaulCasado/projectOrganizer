import IdeaPanel from './IdeaPanel';
import IdeasHeader from './IdeasHeader';
import IdeasStats from './IdeasStats';
import IdeasFilters from './IdeasFilters';
import { useIdeasMainView } from '../hooks/useIdeasMainView';
import { useIdeasWithProjects } from '../../../contexts';

function IdeasMainView() {
    const { ideas } = useIdeasWithProjects();
  const {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortedIdeas,
    stats,
  } = useIdeasMainView({ ideas });

  return (
    <div>
      <IdeasHeader />

      <IdeasStats stats={stats} />

      <IdeasFilters
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalIdeas={stats.total}
        filteredCount={sortedIdeas.length}
      />

      <IdeaPanel ideas={sortedIdeas} />
    </div>
  );
}

export default IdeasMainView;
