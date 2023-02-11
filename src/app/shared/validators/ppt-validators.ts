import { AbstractControl, ValidationErrors } from "@angular/forms";
import { isValidCpf } from "./documents/is-valid-cpf.utils";

export class pptValidators {

  static cpf(control: AbstractControl): ValidationErrors {
    if(control.value && control.value != ''){
      if(!isValidCpf(control.value)){
        return { 'invalidCpf': { 'message': 'CPF inválido' } };
      }
    }
    return null;
  }

  static fullNameSurname(control: AbstractControl): ValidationErrors {
    var regexNameSurname = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    // Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres. Aceita acentuação e rejeita números.

    // Faz a validacao do regex no campo indicado
    if(!(regexNameSurname.test(control.value))){
			return { 'invalidNameSurname': { 'message': 'Nome inválido' } };
		}
    return null;
  }

  static emailUfvDomain(control: AbstractControl): ValidationErrors {
    if(control.value && !control.value.endsWith("@ufv.br")){
      return { 'invalidEmail': { 'message': 'Email precisa ter o domínio da UFV (@ufv.br)' } };
    }
    return null;
  }

  static minLengthCharacter(control: AbstractControl): ValidationErrors {
    if(control.value.length > 6){
      return { 'invalidPassword': { 'message': 'Mínimo de 6 caracteres' } };
    }
    return null;
  }
}
