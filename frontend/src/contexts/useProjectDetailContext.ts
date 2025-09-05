import { useContext } from 'react';
import { ProjectDetailContext } from './ProjectDetailContext';

export function useProjectDetailContext() {
  const context = useContext(ProjectDetailContext);
  if (!context) {
    throw new Error(
      'useProjectDetailContext must be used within a ProjectDetailProvider'
    );
  }
  return context;
}
