export const ease = '0.3s ease';
export const easeIn = '0.3s ease-in';

/** Fast start, soft landing: the default curve for anything entering the screen. */
export const easeOutQuint = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const animations = {
  fadeIn: `fade-in 0.4s ${easeOutQuint} both`,
  viewEnter: `view-enter 0.45s ${easeOutQuint} both`,
  panelEnter: `panel-enter 0.45s ${easeOutQuint} both`,
  sheetEnter: `sheet-enter 0.4s ${easeOutQuint} both`,
  contentEnter: `content-enter 0.35s ${easeOutQuint} both`,
  iconEnter: `icon-enter 0.4s ${easeOutQuint} both`,
};
