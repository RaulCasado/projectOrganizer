import Swal from 'sweetalert2';

export class SwalService {
  static success(title: string, text?: string) {
    Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  static error(title: string, text?: string) {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Entendido',
    });
  }

  static info(title: string, text?: string) {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Ok',
    });
  }

  static async confirm(
    message: string,
    title = '¿Estás seguro?'
  ): Promise<boolean> {
    const result = await Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
    return !!result.isConfirmed;
  }

  static async confirmDelete(
    itemType = 'elemento',
    itemName?: string
  ): Promise<boolean> {
    const title = itemName
      ? `¿Eliminar ${itemType} "${itemName}"?`
      : `¿Eliminar ${itemType}?`;
    const result = await Swal.fire({
      title,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
    return !!result.isConfirmed;
  }

  static async successWithPreview(opts: {
    title?: string;
    text?: string;
    markdown?: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<void> {
    const {
      title = '📤 ¡Exportado!',
      text = 'El resumen semanal se ha copiado al portapapeles',
      markdown,
      confirmText = 'Ver preview',
      cancelText = 'Cerrar',
    } = opts;

    const result = await Swal.fire({
      title,
      text,
      icon: 'success',
      showConfirmButton: !!markdown,
      confirmButtonText: confirmText,
      showCancelButton: true,
      cancelButtonText: cancelText,
    });

    if (result.isConfirmed && markdown) {
      await Swal.fire({
        title: 'Preview del Markdown',
        html: `<pre style="text-align: left; max-height: 400px; overflow-y: auto;">${markdown}</pre>`,
        width: '80%',
        confirmButtonText: 'Cerrar',
      });
    }
  }
}

export default SwalService;
