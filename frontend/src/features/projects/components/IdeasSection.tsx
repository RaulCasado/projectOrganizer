import { IdeaPanel } from '../../ideas/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

function IdeasSection() {
  const {
    project,
    ideas,
    ideaActions
  } = useProjectDetailContext();
  return (
    <section className="project-ideas">
      <IdeaPanel
        projectId={project.id}
        ideas={ideas}
        onAddIdea={ideaActions.addIdea}
        onUpdateIdea={ideaActions.updateIdea}
        onDeleteIdea={ideaActions.deleteIdea}
      />
    </section>
  );
}

export default IdeasSection;
