import onlyNumbers from "../helpers/only-numbers.helper";
import isLastChar from "../helpers/is-last-char.helper";

import { CPF_LENGHT, DOT_INDEXES, HYPHEN_INDEXES} from "./constants-cpf";

export function formatCpf(cpf: string){
  if(!cpf) return '';

  const numericCPF = onlyNumbers(cpf);

  return numericCPF
    .slice(0, CPF_LENGHT)
    .split('')
    .reduce((acc, digit, index) => {
      const result = `${acc}${digit}`;
      if(!isLastChar(index, numericCPF)) {
        if(DOT_INDEXES.includes(index)) return `${result}.`;
        if(HYPHEN_INDEXES.includes(index)) return `${result}-`;
      }
      return result;
    }, '');
}
