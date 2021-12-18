import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PostComponent } from './post.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, MaterialModule, SharedModule, RouterModule],
  exports: [],
})
export class PostModule {}
