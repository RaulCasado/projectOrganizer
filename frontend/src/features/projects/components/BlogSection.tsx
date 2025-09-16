import { ProjectBlog } from '../../blog/components';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';
import styles from './BlogSection.module.css';

function BlogSection() {
  const { project, blogEntries, handleUpdateBlogEntries } =
    useProjectDetailContext();
  return (
    <section className={styles.section}>
      <ProjectBlog
        blogEntries={blogEntries}
        onUpdateBlogEntries={handleUpdateBlogEntries}
        project={project}
      />
    </section>
  );
}

export default BlogSection;
