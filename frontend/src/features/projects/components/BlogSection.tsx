import { ProjectBlog } from '../../blog/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

function BlogSection() {
  const { project, blogEntries, handleUpdateBlogEntries } =
    useProjectDetailContext();
  return (
    <ProjectBlog
      blogEntries={blogEntries}
      onUpdateBlogEntries={handleUpdateBlogEntries}
      project={project}
    />
  );
}

export default BlogSection;
