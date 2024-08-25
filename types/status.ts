export type Status = 'alive' | 'dead' | 'unknown' | '';

export type TStatusList = { label: string; value: Status };

export const StatusList: TStatusList[] = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Alive',
    value: 'alive',
  },
  {
    label: 'Dead',
    value: 'dead',
  },
  {
    label: 'Unknown',
    value: 'unknown'
  },
];
