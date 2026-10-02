import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitsonly]',
})
export class Digitsonly {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowed.includes(event.key)) return;
    if (!/^[0-9]$/.test(event.key)) event.preventDefault();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    const cleaned = input.value.replace(/\D+/g, '');
    if (input.value !== cleaned) input.value = cleaned;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = (event.clipboardData || (window as any).clipboardData).getData('text') || '';
    this.el.nativeElement.value = pasted.replace(/\D+/g, '');
  }
}
