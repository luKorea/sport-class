import {constantMap} from './constant';
import {dateFormat} from '@/utils';
export function constant(input, key){
  if(!key || !constantMap[key]){
    return input;
  }
  const current = constantMap[key].find(a=>a.value==input);
  console.log('current',current)
  return current && current.label || input;
}
export function time(time, format) {
    return dateFormat(time,format)
}