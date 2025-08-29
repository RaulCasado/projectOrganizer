import type { Resource } from '../../../shared/types/Project';
import { ProjectResources } from '../../resources/components';

interface ResourcesSectionProps {
  resources: Resource[];
  onUpdateResources: (resources: Resource[]) => void;
}

function ResourcesSection({
  resources,
  onUpdateResources
}: ResourcesSectionProps) {
  return (
    <section className="project-resources">
      <ProjectResources
        resources={resources}
        onUpdateResources={onUpdateResources}
      />
    </section>
  );
}

export default ResourcesSection;
