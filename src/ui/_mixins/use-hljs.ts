import { HLJSApi } from 'highlight.js';

interface UseHljsProps {
  hljs?: unknown;
  [key: string]: unknown;
}

export interface Hljs {
  highlight: HLJSApi['highlight'];
  getLauguage: HLJSApi['getLanguage'];
}
