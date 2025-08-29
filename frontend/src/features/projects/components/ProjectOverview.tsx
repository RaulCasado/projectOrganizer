import type { Project } from '../../../shared/types';

interface ProjectOverviewProps {
    project: Project;
}

function ProjectOverview({ project }: ProjectOverviewProps) {
    return (
        <>
            <h1>{project.name}</h1>

            {project.stack && project.stack.length > 0 && (
                <div>
                    <h3>Stack:</h3>
                    <ul>
                        {project.stack.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
            )}

            {project.requirements && project.requirements.length > 0 && (
                <div>
                    <h3>Requirements:</h3>
                    <ul>
                        {project.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
            )}

            {project.dependencies && project.dependencies.length > 0 && (
                <div>
                    <h3>Dependencies:</h3>
                    <ul>
                        {project.dependencies.map((dep, index) => (
                            <li key={index}>{dep}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProjectOverview;
