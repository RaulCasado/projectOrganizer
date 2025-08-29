interface PopularTagsProps {
  popularTags: [string, number][];
}

function PopularTags({ popularTags }: PopularTagsProps) {
  return (
    <div>
      <h3>🏷️ Tags más usados</h3>
      {popularTags.length === 0 ? (
        <p>No hay tags definidos</p>
      ) : (
        <div>
          {popularTags.map(([tag, count]) => (
            <span key={tag}>
              {tag} ({count})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PopularTags;
