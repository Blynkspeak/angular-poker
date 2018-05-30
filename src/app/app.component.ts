import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { pokerHandValidator } from './poker-regex.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  formErrors: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      'pokerhand': new FormControl('Ah As Ac Ad 2s', [
        Validators.required,
        Validators.minLength(4),
        pokerHandValidator()
      ])
    });
    this.pokerhand.setErrors({'pokerhand': {value: "Failure"}});
  }

  
  get pokerhand() { return this.myForm.get('pokerhand'); }
}
