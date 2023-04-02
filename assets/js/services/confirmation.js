import swal from 'sweetalert2';
import { I18n } from 'react-i18nify';

export const confirmAction = (action, message) => {
  swal({
    title: I18n.t('confirmation.warningTitle'),
    text: message,
    type: 'warning',
    confirmButtonText: I18n.t('confirmation.ok'),
    cancelButtonText: I18n.t('confirmation.cancel'),
    showCancelButton: true,
  }).then(() => {
    action();
  }).catch(swal.noop);
};

export default confirmAction;
