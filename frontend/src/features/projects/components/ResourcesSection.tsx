import { ProjectResources } from '../../resources/components';
import styles from './ResourcesSection.module.css';

function ResourcesSection() {
  return (
    <section className={styles.section}>
      <ProjectResources />
    </section>
  );
}

export default ResourcesSection;
