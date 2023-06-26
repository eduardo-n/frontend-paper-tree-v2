import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { formatCpf } from '../../formatters/format-cpf.utils';

@Directive({
  selector: '[pptCpfMaskDirective]'
})
export class CpfMaskDirective implements OnInit {

  @Input() pptCpfMaskDirective: AbstractControl;
  public nativeElement: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.nativeElement = this.el.nativeElement;
  }

  ngOnInit(): void {
      this.maskValue(this.pptCpfMaskDirective.value);
      this.pptCpfMaskDirective.valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(newValue => {
        this.maskValue(newValue);
      });
  }

  maskValue(value){
    if(value){
      const newValue = this.format(value);
      this.pptCpfMaskDirective.setValue(newValue);
    }
  }

  format(value: string): string {
    return formatCpf(value);
  }
}
