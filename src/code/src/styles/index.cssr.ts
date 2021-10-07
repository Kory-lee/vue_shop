import { c, cB } from '/@/_utils/cssr';

export default c([
  cB(
    'code',
    {
      display: 'block',
      fontSize: 'var(--font-size)',
      fontFamily: 'var(--font-family)',
    },
    [
      c('pre', { margin: 0, fontFamily: 'inherit' }),
      c('[class^=hljs]', {
        color: 'var(--text-color)',
        transition: `
        color .3s var(--bezier),
        background .3s var(--bezier)
        `,
      }),
    ]
  ),
  ({ props }) => {
    const codeClass = `${props.bPrefix}code`;

    return [
      `${codeClass} .hljs-comment,
      ${codeClass} .hljs-quote {
        color: var(--mono-3);
        font-style: italic;
      }`,
      `${codeClass} .hljs-doctag,
      ${codeClass} .hljs-keyword,
      ${codeClass} .hljs-formula {
        color: var(--hue-3);
      }`,
      `${codeClass} .hljs-section,
      ${codeClass} .hljs-name,
      ${codeClass} .hljs-selector-tag,
      ${codeClass} .hljs-deletion,
      ${codeClass} .hljs-subst {
        color: var(--hue-5);
      }`,
      `${codeClass} .hljs-literal {
        color: var(--hue-1);
      }`,
      `${codeClass} .hljs-string,
      ${codeClass} .hljs-regexp,
      ${codeClass} .hljs-addition,
      ${codeClass} .hljs-attribute,
      ${codeClass} .hljs-meta-string {
        color: var(--hue-4);
      }`,
      `${codeClass} .hljs-built_in,
      ${codeClass} .hljs-class .hljs-title {
        color: var(--hue-6-2);
      }`,
      `${codeClass} .hljs-attr,
      ${codeClass} .hljs-variable,
      ${codeClass} .hljs-template-variable,
      ${codeClass} .hljs-type,
      ${codeClass} .hljs-selector-class,
      ${codeClass} .hljs-selector-attr,
      ${codeClass} .hljs-selector-pseudo,
      ${codeClass} .hljs-number {
        color: var(--hue-6);
      }`,
      `${codeClass} .hljs-symbol,
      ${codeClass} .hljs-bullet,
      ${codeClass} .hljs-link,
      ${codeClass} .hljs-meta,
      ${codeClass} .hljs-selector-id,
      ${codeClass} .hljs-title {
        color: var(--hue-2);
      }`,
      `${codeClass} .hljs-emphasis {
        font-style: italic;
      }`,
      `${codeClass} .hljs-strong {
        font-weight: var(--font-weight-strong);
      }`,
      `${codeClass} .hljs-link {
        text-decoration: underline;
      }`,
    ];
  },
]);
