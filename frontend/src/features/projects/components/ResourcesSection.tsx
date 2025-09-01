import { ProjectResources } from '../../resources/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

function ResourcesSection() {
  const {
    resources,
    handleUpdateResources
  } = useProjectDetailContext();
  return (
    <section className="project-resources">
      <ProjectResources
        resources={resources}
        onUpdateResources={handleUpdateResources}
      />
    </section>
  );
}

export default ResourcesSection;
