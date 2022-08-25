import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms'
@Directive({
  selector: '[NumbersOnly]'
})
export class NumbersOnlyDirective {


  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  // Listen for the input event to also handle copy and paste.
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Use NgControl patchValue to prevent the issue on validation
    console.log(value)
    if(this.el.control==null)return
    value.replace(/^[0-9+-]*/g, '')
    console.log(value)

    if(value!='+'&&value!='-'){
    if(value.match(/^[+-]?((\d+((\.|\,)\d*)?)|((\.|\,)\d+))$/g)==null)
      value = value.substring(0,value.length-1)

    this.el.control.patchValue(value.match(/^[+-]?((\d+((\.|\,)\d*)?)|((\.|\,)\d+))$/g))
    //(value.replace(/^[+-]?((\d+(\.\d*)?)|(\.\d+))$/g, ''));
    }
    console.log(this.el.control.getRawValue() )
  }

}
