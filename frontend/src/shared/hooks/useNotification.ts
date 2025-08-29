import { useCallback } from 'react';
import SwalService from '../services/swalService';

export function useNotification() {
  const notifySuccess = useCallback((message: string, title = 'Éxito') => {
    SwalService.success(title, message);
  }, []);

  const notifyError = useCallback((message: string, title = 'Error') => {
    SwalService.error(title, message);
  }, []);

  const notifyInfo = useCallback((message: string, title = 'Info') => {
    SwalService.info(title, message);
  }, []);

  const confirm = useCallback(async (message: string, title?: string) => {
    return SwalService.confirm(message, title);
  }, []);

  const confirmDelete = useCallback(async (itemType?: string, itemName?: string) => {
    return SwalService.confirmDelete(itemType, itemName);
  }, []);

  const showPreview = useCallback(async (markdown: string, opts?: { title?: string; text?: string }) => {
    await SwalService.successWithPreview({
      title: opts?.title,
      text: opts?.text,
      markdown,
    });
  }, []);

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    confirm,
    confirmDelete,
    showPreview,
  } as const;
}

export default useNotification;