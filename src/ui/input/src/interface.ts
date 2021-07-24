export type InputSize = 'tiny' | 'small' | 'medium' | 'large';

export type OnUpdateValue = <T extends string & [string, string]>(value: T) => void;
