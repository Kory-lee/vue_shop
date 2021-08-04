import useTheme from '/@/_mixins/use-theme';
import { ExtractPropTypes } from 'vue';

type ThemePropsKeys = keyof typeof useTheme.props;
export type ExtractPublicPropTypes<T> = Omit<
  Partial<ExtractPropTypes<T>>,
  ThemePropsKeys | Extract<keyof T, `internal${string}`>
>;
export type ExtractInternalPropTypes<T> = Partial<ExtractPropTypes<T>>;
