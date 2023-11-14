import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../../models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  input: Dialog

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Dialog,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
      this.input = this.data
  }

  close() {
    this.dialogRef.close(false)
  }
  
  ok() {
    this.dialogRef.close(true)
  }
}
