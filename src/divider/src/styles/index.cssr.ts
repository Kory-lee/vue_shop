import { cB, cE, cM, cNotM } from '/@/_utils/cssr';

export default cB(
  'divider',
  {
    position: 'relative',
    display: 'flex',
    boxSizing: 'border-box',
    fontSize: '16px',
    color: 'var(--text-color)',
    transition: `
  color .3s var(--bezier)
  background-color .3s var(--bezier)
  `,
  },
  [
    cNotM(
      'vertical',
      {
        marginTop: '24px',
        marginBottom: '24px',
      },
      [
        cNotM('no-title', {
          display: 'flex',
          alignItems: 'center',
        }),
      ]
    ),
    cE(
      'title',
      `
    display: flex;
    align-items: center;
    margin-left: 12px;
    margin-right: 12px;
    white-space: nowrap;
    font-weight: var(--font-weight);
  `
    ),
    cM('title-position-left', [cE('line', [cM('left', { width: '28px' })])]),
    cM('title-position-right', [cE('line', [cM('right', { width: '28px' })])]),
    cM('dashed', [
      cE('line', {
        backgroundColor: '#0000',
        height: '0px',
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: '1px 0 0',
      }),
    ]),
    cM(
      'vertical',
      `
    display: inline-block;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    width: 1px;
  `
    ),
    cE(
      'line',
      `
    border: none;
    transition: background-color .3s var(--bezier), border-color .3s var(--bezier);
    height: 1px;
    width: 100%;
    margin: 0;
  `
    ),
    cNotM('dashed', [
      cE('line', {
        backgroundColor: 'var(--color)',
      }),
    ]),
    cM('dashed', [
      cE('line', {
        borderColor: 'var(--color)',
      }),
    ]),
    cM('vertical', {
      backgroundColor: 'var(--color)',
    }),
  ]
);
