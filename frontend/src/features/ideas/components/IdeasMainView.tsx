import type { Idea } from '../../../shared/types/Idea';
import IdeaPanel from './IdeaPanel';
import IdeasHeader from './IdeasHeader';
import IdeasStats from './IdeasStats';
import IdeasFilters from './IdeasFilters';
import { useIdeasMainView } from '../hooks/useIdeasMainView';

interface IdeasMainViewProps {
    ideas: Idea[];
    onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
    onUpdateIdea: (idea: Idea) => void;
    onDeleteIdea: (ideaId: string) => void;
    onPromoteToProject: (idea: Idea) => void;
}

function IdeasMainView({
    ideas,
    onAddIdea,
    onUpdateIdea,
    onDeleteIdea,
    onPromoteToProject
}: IdeasMainViewProps) {
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

      <IdeaPanel
        ideas={sortedIdeas}
        onAddIdea={onAddIdea}
        onUpdateIdea={onUpdateIdea}
        onDeleteIdea={onDeleteIdea}
        onPromoteToProject={onPromoteToProject}
      />
    </div>
  );
}

export default IdeasMainView;
