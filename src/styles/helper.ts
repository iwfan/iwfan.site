import { rem } from 'polished';
export const px2rem = (px: number) => rem(`${px}px`, '12px');
