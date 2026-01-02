import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  standalone:true
})
export class UserForm {
     imagePreview: string | null = null;
  imageError = '';

  constructor(
    private dialogRef: MatDialogRef<UserForm>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any; mode: 'Add' | 'Edit' }
  ) {
    this.imagePreview = data.user.image || null;
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Only image files allowed';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.data.user.image = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }

  save(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.data.user);
  }

  close() {
    this.dialogRef.close();
  }


}
