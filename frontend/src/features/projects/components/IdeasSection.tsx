import { IdeaPanel } from '../../ideas/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';
import styles from './IdeasSection.module.css';

function IdeasSection() {
  const { project } = useProjectDetailContext();
  return (
    <section className={styles.section}>
      <IdeaPanel projectId={project.id} />
    </section>
  );
}

export default IdeasSection;
