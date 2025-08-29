import type { Idea } from '../../../shared/types/Idea';
import { IdeaPanel } from '../../ideas/components';

interface IdeasSectionProps {
  projectId: string;
  ideas: Idea[];
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: string) => void;
}

function IdeasSection({
  projectId,
  ideas,
  onAddIdea,
  onUpdateIdea,
  onDeleteIdea
}: IdeasSectionProps) {
  return (
    <section className="project-ideas">
      <IdeaPanel
        projectId={projectId}
        ideas={ideas}
        onAddIdea={onAddIdea}
        onUpdateIdea={onUpdateIdea}
        onDeleteIdea={onDeleteIdea}
      />
    </section>
  );
}

export default IdeasSection;
