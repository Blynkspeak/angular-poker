import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** Returning Valid Poker Hand Names */
export function pokerHandValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    
    let handResult = 'No Hands Found';
    let result = true;
    // Format to lowercase and strip whitespace
    let formatValidation = control.value.toUpperCase().replace(/ /g,'').replace(/,/g,'').split("");
    // Verify that length is 10
    if (formatValidation.length === 10){
      let cards = formatValidation[0] + formatValidation[2] + formatValidation[4] + formatValidation[6] + formatValidation[8];
      let suits = formatValidation[1] + formatValidation[3] + formatValidation[5] + formatValidation[7] + formatValidation[9];
      let format = Array.from(cards).sort().toString().replace(/,/g,'')  + "#" + Array.from(suits).sort().toString().replace(/,/g,'');
      let hands = [
        { regex: /(2345A|23456|34567|45678|56789|6789T|789JT|89JQT|9JKQT|AJKQT)#(.)\2{4}.*/g , name: 'Straight flush' },
        { regex: /(.)\1{3}.*#.*/g , name: 'Four of a kind' },
        { regex: /((.)\2{2}(.)\3{1}#.*|(.)\4{1}(.)\5{2}#.*)/g , name: 'Full house' },
        { regex: /.*#(.)\1{4}.*/g , name: 'Flush' },
        { regex: /(2345A|23456|34567|45678|56789|6789T|789JT|89JQT|9JKQT|AJKQT)#.*/g , name: 'Straight' },
        { regex: /(.)\1{2}.*#.*/g , name: 'Three of a kind' },
        { regex: /(.)\1{1}.*(.)\2{1}.*#.*/g , name: 'Two pair' },
        { regex: /(.)\1{1}.*#.*/g , name: 'One pair' },
      ];
      
      hands.forEach(function(el) {
        // console.log(format, el.regex, el.name, el.regex.test(format));
        if (el.regex.test(format) && result){
          // console.log(format, el.regex, el.name);
          handResult = el.name;
          result = false;
        }
      });
    }
      return result ? null : {'pokerhand': {value: handResult}};
  };

}

@Directive({
  selector: '[appPokerRegex]',
  providers: [{provide: NG_VALIDATORS, useValue: pokerHandValidator, multi: true}]
})

export class PokerRegexDirective implements Validator {
  @Input('appPokerRegex') pokerhand: string;

  validate(control: AbstractControl): {[key: string]: any} {
    return pokerHandValidator()(control);
  }

}
