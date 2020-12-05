export interface DropMenu {
  to?: string;
  icon?: string;
  event: string | number;
  test: string;
  disabled?: boolean;
  divider?: boolean;
}

export type Trigger = 'click' | 'hover' | 'contextMenu';
