import { c, cB, cE } from '/@/_utils/cssr';
import iconSwitchTransition from '/@/_styles/transitions/icon-switch.cssr';

export default cB(
  `base-clear`,
  {
    flexShrink: 0,
    height: '1em',
    width: '1em',
    position: 'relative',
  },
  [
    c('>', [
      cE(
        'clear',
        {
          fontSize: 'var(--clear-size)',
          cursor: 'pointer',
          color: 'var(--clear-close)',
          transition: 'color .3s var(--bezier)',
        },
        [
          c('&:hover', { color: 'var(--clear-color-hover)!important' }),
          c('&:active', { color: 'var(--clear-color-pressed)!important' }),
        ]
      ),
      cE('placeholder', { display: 'flex' }),
      cE(
        'clear, placeholder',
        {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        },
        [
          iconSwitchTransition({
            originalTransform: 'translateX(-50%) translateY(-50%)',
            left: '50%',
            top: '50%',
          }),
        ]
      ),
    ]),
  ]
);
