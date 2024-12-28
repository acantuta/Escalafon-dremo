import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseInputDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    
    if (this.control.control) {
      const value = input.value.toUpperCase();
      this.control.control.setValue(value, { emitEvent: false });
      
      // Mantener la posición del cursor
      input.setSelectionRange(start, end);
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
} 