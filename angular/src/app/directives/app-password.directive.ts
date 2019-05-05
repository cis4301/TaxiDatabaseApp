import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppPassword]'
})
export class AppPasswordDirective {
  private visible = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  setup() {

    const parent = this.el.nativeElement.parentNode;
    var attributes = {class: 'glyphicon glyphicon-eye-close', style: 'margin-left: 10px !important'};
    const span = document.createElement('i');

    for (var key in attributes) {
        span.setAttribute(key, attributes[key]);
    }

    span.addEventListener('click', (event) => {
      this.toggle(span);
    });

    parent.appendChild(span);
  }

  toggle(element: HTMLElement) {
    this.visible = !this.visible;
    if (this.visible) {
      this.el.nativeElement.setAttribute('type', 'text');
      element.setAttribute('class', 'glyphicon glyphicon-eye-open')
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      element.setAttribute('class', 'glyphicon glyphicon-eye-close')
    }
  }
}
