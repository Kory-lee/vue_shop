import { c, cB, cCB, cE, cM, cNotM } from '/@/_utils/cssr';
import { FollowerPlacement } from 'vueuc';
import type { CNode, CProperties } from 'css-render';
const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export default c([
  cB(
    'popover',
    {
      transition: `
  box-shadow .3s var(--bezier),
  background-color .3s var(--bezier),
  color .3s var(--bezier)
  `,
      transformOrigin: 'inherit',
      position: 'relative',
      fontSize: 'var(--font-size)',
      color: 'var(--text-color)',
      boxShadow: 'var(--box-shadow)',
    },
    [
      c('&.popover-transition-enter-from, &.popover-transition-leave-to', {
        opacity: 0,
        transform: 'scale(.85)',
      }),
      c('&.popover-transition-enter-to, &.popover-transition-leave-from', {
        opacity: 1,
        transform: 'scale(1)',
      }),
      c('&.popover-transition-enter-active', {
        transition: `
        opacity .15s var(--bezier-ease-out),
        transform .15s var(--bezier-ease-out)
        `,
      }),
      c('&.popover-transition-leave-active', {
        transition: `
        opacity .15s var(--bezier-ease-in),
        transform .15s var(--bezier-ease-in)
        `,
      }),
      cNotM(
        'raw',
        {
          backgroundColor: 'var(--color)',
          borderRadius: 'var(--border-radius)',
          padding: 'var(--padding)',
        },
        [cNotM('show-header', { padding: 'var(--padding)' })]
      ),
      cE('header', {
        padding: 'var(--padding)',
        borderBottom: '1px solid var(--divider-color)',
        transition: 'border-color .3s var(--bezier)',
      }),
      cE('content', { padding: 'var(--padding)' }),
      cB(
        'popover-arrow-wrapper',
        {
          position: 'absolute',
          overflow: 'hidden',
          pointerEvents: 'none',
        },
        [
          cB('popover-arrow', {
            transition: 'background-color .3s var(--bezier)',
            position: 'absolute',
            display: 'block',
            width: 'calc(var(--arrow-height) * 1.414)',
            height: 'calc(var(--arrow-height) * 1.414)',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, .12)',
            transform: 'rotate(45deg)',
            backgroundColor: 'var(--color)',
            pointerEvents: 'all',
          }),
        ]
      ),
    ]
  ),
  placementStyle('top-start', {
    top: 'calc(-0.707 * var(--arrow-height))',
    left: 'var(--arrow-offset)',
  }),
  placementStyle('top', {
    top: 'calc(-0.707 * var(--arrow-height))',
    transform: 'translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg)',
    left: '50%',
  }),
  placementStyle('top-end', {
    top: 'calc(-0.707 * var(--arrow-height))',
    right: 'var(--arrow-offset)',
  }),
  placementStyle('bottom-start', {
    bottom: 'calc(-0.707 * var(--arrow-height))',
    left: 'var(--arrow-offset)',
  }),
  placementStyle('bottom', {
    bottom: 'calc(-0.707 * var(--arrow-height))',
    transform: 'translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg)',
    left: '50%',
  }),
  placementStyle('bottom-end', {
    bottom: 'calc(-0.707 * var(--arrow-height))',
    right: 'var(--arrow-offset)',
  }),
  placementStyle('left-start', {
    left: 'calc(-0.707 * var(--arrow-height))',
    top: 'var(--arrow-offset-vertical)',
  }),
  placementStyle('left', {
    left: 'calc(-0.707 * var(--arrow-height))',
    transform: 'translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg)',
    top: '50%',
  }),
  placementStyle('left-end', {
    left: 'calc(-0.707 * var(--arrow-height))',
    bottom: 'var(--arrow-offset-vertical)',
  }),
  placementStyle('right-start', {
    right: 'calc(-0.707 * var(--arrow-height))',
    top: 'var(--arrow-offset-vertical)',
  }),
  placementStyle('right', {
    right: 'calc(-0.707 * var(--arrow-height))',
    transform: 'translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg)',
    top: '50%',
  }),
  placementStyle('right-end', {
    right: 'calc(-0.707 * var(--arrow-height))',
    bottom: 'var(--arrow-offset-vertical)',
  }),
]);

function placementStyle(placement: FollowerPlacement, arrowStyleLiteral: CProperties): CNode {
  const position = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
  const sizeStyle = ['top', 'bottom'].includes(position)
    ? { height: 'var(--space-arrow)' }
    : { width: 'var(--space-arrow)' };
  return c(`[v-placement="${placement}"] >`, [
    cB('popover', { [`margin-${oppositePlacement[position]}`]: 'var(--space)' }, [
      cM('show-arrow', { [`margin-${oppositePlacement[position]}`]: 'var(--space-arrow)' }),
      cM('overlap', { margin: 0 }),
      cCB(
        'popover-arrow-wrapper',
        {
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          [position]: '100%',
          [oppositePlacement[position]]: 'auto',
          ...sizeStyle,
        },
        [cB('popover-arrow', arrowStyleLiteral)]
      ),
    ]),
  ]);
}
