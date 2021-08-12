import { cB, c, cM, cNotM, insideModal, insidePopover } from '/@/_utils/cssr';

// @ts-ignore
// @ts-ignore
// @ts-ignore
export default c([
  cB(
    'table',
    {
      fontSize: 'var(--font-size)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 'var(--line-height)',
      width: '100%',
      borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
      textAlign: 'left',
      borderCollapse: 'separate',
      borderSpacing: 0,
      overflow: 'hidden',
      backgroundColor: 'var(--td-color)',
      transition: `
    background-color .3s var(--bezier),
    border-color .3s var(--bezier),
    color .3s var(--bezier)
    `,
      '--merged-bordered-color': 'var(--border-color)',
    },
    [
      c(
        'th',
        {
          whiteSpace: 'nowrap',
          textAlign: 'inherit',
          padding: 'var(--th-padding)',
          verticalAlign: 'inherit',
          textTransform: 'none',
          border: 'none',
          'font-weight': ' var(--th-font-weight)',
          color: 'var(--th-text-color)',
          backgroundColor: 'var(--th-color)',
          borderColor: 'var(--merged-border-color)',
          borderBottom: '1px solid var(--merged-border-color)',
          borderRight: '1px solid var(--merged-border-color)',
          transition: `
        background-color .3s var(--bezier),
        border-color 0.3s var(--bezier),
        color 0.3s var(--bezier)
        `,
        },
        [c('&:last-child', { borderRight: 'none' })]
      ),
      c(
        'td',
        {
          padding: 'var(--td-padding)',
          color: 'var(--td-text-color)',
          backgroundColor: 'var(--td-color)',
          borderRight: '1px solid var(--merged-border-color)',
          borderBottom: '1px solid var(--merged-border-color)',
          transition: `
          background-color .3s var(--bezier),
          border-color .3s var(--bezier),
          color .3s var(--bezier)
          `,
        },
        [c('&:last-child', { borderRight: 'none' })]
      ),
      cM('bordered', [c('tr', [c('&:last-child', [c('td', { borderBottom: 'none' })])])]),
      cM('single-line', [c('th', { borderRight: 'none' }), c('td', { borderRight: 'none' })]),
      cM('single-column', [
        c('tr', [c('&:not(:last-child)', [c('td', { borderBottom: 'none' })])]),
      ]),
      cNotM('bottom-bordered', [c('tr', [c('&:last-child', [c('td', { borderBottom: 'none' })])])]),
      insideModal(
        cB(
          'table',
          {
            backgroundColor: 'var(--td-color-modal)',
            '--merged-border-color': 'var(--border-color-modal)',
          },
          [
            c('th', { backgroundColor: 'var(--th-color-modal)' }),
            c('td', { backgroundColor: 'var(--th-color-modal)' }),
          ]
        )
      ),
      insidePopover(
        cB(
          'table',
          {
            backgroundColor: 'var(--td-color-popover)',
            '--merged-border-color': 'var(--border-color-popover)',
          },
          [
            c('th', { backgroundColor: 'var(--th-color-popover)' }),
            c('td', { backgroundColor: 'var(--th-color-popover)' }),
          ]
        )
      ),
    ]
  ),
]);
