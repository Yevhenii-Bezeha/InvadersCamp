import { ModalService } from './../../services/modalService';
import { PostsService } from './../../services/postsService';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  postForm = this.fb.group({
    authorName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    this.postService.addPost(this.postForm.value);
    this.postForm.reset();
    this.modalService.showModal();
    this.modalService.closeSidenav();
  }

  onCloseClick() {
    this.modalService.showModal();
  }

  matcher = new MyErrorStateMatcher();
}
