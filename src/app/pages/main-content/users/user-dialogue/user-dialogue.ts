import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../interface/user-data.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-user-dialogue',
  imports: [MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatIconModule,
MatSelectModule,
FormsModule
],
  templateUrl: './user-dialogue.html',
  styleUrl: './user-dialogue.scss',
})
export class UserDialogue {
  
  user: User = {
    id: 0,
    name: '',
    dob: '',
    age: 0,
    gender: 'Male',
    mail: '',
    image: 'img/avatar.png'
  };

  constructor(
    private dialogRef: MatDialogRef<UserDialogue>,
    @Inject(MAT_DIALOG_DATA) data: User,private cdr: ChangeDetectorRef
  ) {
    if (data) this.user = data; 
  }

  save() {
    this.dialogRef.close(this.user);
  }

  close() {
    this.dialogRef.close();
  }
  onImageSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    this.user.image = reader.result as string; 
    this.cdr.detectChanges(); 
  };
  reader.readAsDataURL(file);
}

}
