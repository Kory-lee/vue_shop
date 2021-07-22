import { CNode, CProperties, CssRender } from 'css-render';
import BEMPlugin from '@css-render/plugin-bem';

const namespace = 'n';
const prefix = `.${namespace}-`;
const elementPrefix = `__`;
const modifierPrefix = `--`;

const cssr = CssRender();
const plugin = BEMPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix,
});
cssr.use(plugin);
const { c, find } = cssr;
const { cB, cE, cM, cNotM } = plugin;

function insidePopover(style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) => `${bPrefix || prefix}popover:not(${bPrefix || prefix}tooltip)`,
    [style]
  );
}

function asModal(style: CProperties): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style);
}

export { c, cB, cE, cM, cNotM, find, asModal, insidePopover };
