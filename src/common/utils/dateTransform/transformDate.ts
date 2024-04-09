import { isValid, parse } from 'date-fns';

export function transformDate(value: string): Date | null {
  const date = parse(value, 'dd /MM/yyyy', new Date());
  return isValid(date) ? date : null;
}
