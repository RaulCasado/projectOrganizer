import { useEffect, useRef } from 'react';
import NotificationService from '../services/notificationService';
import type { Project } from '../types/Project';

export function useNotifications(projects: Project[]) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    NotificationService.requestPermission();
    NotificationService.scheduleCheck(projects, 5000);
    cleanupRef.current = NotificationService.setupPeriodicChecks(projects);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [projects]);

  const checkNow = () => {
    NotificationService.runAllChecks(projects);
  };

  return { checkNow };
}
