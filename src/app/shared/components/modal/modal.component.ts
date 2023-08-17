import { Component, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from '../../utils';

@Component({
  selector: 'four-create-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  modalData: ModalData | undefined;
  header = '';
  htmlContent: TemplateRef<any> | undefined;

  constructor(
    public modalRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {
    this.loadModalData(data);
  }

  loadModalData(data: ModalData) {
    this.modalData = data;

    if (!isNullOrUndefined(data.header)) this.header = data.header as string;
    if (!isNullOrUndefined(data.htmlContent))
      this.htmlContent = data.htmlContent as TemplateRef<any>;
  }

  cancelClicked() {
    this.modalRef.close(false);
  }
}

export interface ModalData {
  header?: string;
  htmlContent?: TemplateRef<any>;
}
