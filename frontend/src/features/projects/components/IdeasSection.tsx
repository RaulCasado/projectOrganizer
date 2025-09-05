import { IdeaPanel } from '../../ideas/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

function IdeasSection() {
  const { project } = useProjectDetailContext();
  return (
    <section className="project-ideas">
      <IdeaPanel projectId={project.id} />
    </section>
  );
}

export default IdeasSection;
