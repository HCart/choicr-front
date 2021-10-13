import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent {

  isEditing: boolean;
  pendingValue: string | number;
  @Input() value!: string | number;
  @Output() valueChange: EventEmitter<string | number>;


  constructor() {

    this.isEditing = false;
    this.pendingValue = '';
    this.valueChange = new EventEmitter();
  }

  public cancel(): void {

    this.isEditing = false;
  }

  public edit(): void {

    this.pendingValue = this.value;
    this.isEditing = true;
  }

  public processChanges(): void {

    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.value) {

      this.valueChange.emit(this.pendingValue);
    }
    this.isEditing = false;
  }

}
