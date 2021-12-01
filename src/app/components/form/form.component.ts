import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  postForm = this.fb.group({
    authorName: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.postForm);
  }
}
