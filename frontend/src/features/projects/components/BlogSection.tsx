import type { BlogEntry, Project } from '../../../shared/types';
import { ProjectBlog } from '../../blog/components';

interface BlogSectionProps {
  blogEntries: BlogEntry[];
  onUpdateBlogEntries: (blogEntries: BlogEntry[]) => void;
  project: Project;
}

function BlogSection({
  blogEntries,
  onUpdateBlogEntries,
  project
}: BlogSectionProps) {
  return (
    <ProjectBlog
      blogEntries={blogEntries}
      onUpdateBlogEntries={onUpdateBlogEntries}
      project={project}
    />
  );
}

export default BlogSection;
