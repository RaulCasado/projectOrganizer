import styles from './PopularTags.module.css';

interface PopularTagsProps {
  popularTags: [string, number][];
}

function PopularTags({ popularTags }: PopularTagsProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🏷️ Tags más usados</h3>
      {popularTags.length === 0 ? (
        <p className={styles.emptyState}>No hay tags definidos</p>
      ) : (
        <div className={styles.tagsContainer}>
          {popularTags.map(([tag, count]) => (
            <span key={tag} className={styles.tag}>
              {tag} <span className={styles.tagCount}>({count})</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PopularTags;
