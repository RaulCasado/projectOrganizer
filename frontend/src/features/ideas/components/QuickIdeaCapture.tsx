import { QuickInput, ExpandedForm } from './';
import { useQuickIdeaCapture } from '../hooks/useQuickIdeaCapture';
import type { Idea } from '../../../shared/types/Idea';
import styles from './ideas.module.css';

interface QuickIdeaCaptureProps {
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => void;
}

function QuickIdeaCapture({ onAddIdea }: QuickIdeaCaptureProps) {
  const {
    title,
    setTitle,
    isExpanded,
    handleSubmit,
    handleQuickAdd,
    toggleExpanded,
  } = useQuickIdeaCapture({ onAddIdea });

  return (
    <div className={styles.quickCaptureContainer}>
      <QuickInput
        title={title}
        setTitle={setTitle}
        isExpanded={isExpanded}
        onQuickAdd={handleQuickAdd}
        onToggleExpanded={toggleExpanded}
      />

      {isExpanded && (
        <ExpandedForm
          title={title}
          onSubmit={handleSubmit}
          onCancel={toggleExpanded}
        />
      )}
    </div>
  );
}

export default QuickIdeaCapture;
