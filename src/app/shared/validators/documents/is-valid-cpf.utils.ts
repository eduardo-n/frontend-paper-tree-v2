
// Blacklist commo values.
const BLACKLIST: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999'
]

const STRICT_STRIP_REGEX: RegExp = /[.-]/g
const LOOSE_STRIPED_REGEX: RegExp = /[^\d]/g

const verifierDigit = (digits: string): number => {
  const numbers: Array<number> = digits
    .split('')
    .map(number => {
      return parseInt(number, 10);
    })

  const modulus: number = numbers.length + 1;
  const multiplied: Array<number> = numbers.map((number, index) => number * (modulus - index));
  const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11;

  return (mod < 2 ? 0 : 11 - mod);
}

const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIPED_REGEX;
  return (number || '').replace(regex, '');
}

export const isValidCpf = (number: string, strict?: boolean): boolean => {
  const stripped: string = strip(number, strict);

  // CPF must be defined
  if(!stripped){
    return false;
  }

  // CPF must have 11 chars
  if(stripped.length !== 11){
    return false;
  }

  // CPF can't be blacklisted
  if(BLACKLIST.includes(stripped)){
    return false;
  }

  let numbers: string = stripped.substr(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substr(-2) === stripped.substr(-2);
}
