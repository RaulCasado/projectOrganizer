import QuickInput from './QuickInput';
import ExpandedForm from './ExpandedForm';
import { useQuickIdeaCapture } from '../hooks/useQuickIdeaCapture';
import type { Idea } from '../../../shared/types/Idea';

interface QuickIdeaCaptureProps {
    onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => void;
}

function QuickIdeaCapture({ onAddIdea }: QuickIdeaCaptureProps) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    category,
    setCategory,
    tags,
    setTags,
    isExpanded,
    handleSubmit,
    handleQuickAdd,
    toggleExpanded,
  } = useQuickIdeaCapture({ onAddIdea });

  return (
    <div>
      <QuickInput
        title={title}
        setTitle={setTitle}
        isExpanded={isExpanded}
        onQuickAdd={handleQuickAdd}
        onToggleExpanded={toggleExpanded}
      />

      {isExpanded && (
        <ExpandedForm
          description={description}
          setDescription={setDescription}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          title={title}
          onSubmit={handleSubmit}
          onCancel={toggleExpanded}
        />
      )}
    </div>
  );
}

export default QuickIdeaCapture;
