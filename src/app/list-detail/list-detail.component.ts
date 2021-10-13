import {Component, OnInit} from '@angular/core';
import {ChoiceList} from '../model/ChoiceList';
import {ListService} from '../service/list.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Entry} from '../model/Entry';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  list: ChoiceList = new ChoiceList();

  constructor(private listService: ListService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.listService.getList(name).subscribe(list => this.list = list);
  }

  save(): void {
    this.listService.updateList(this.list).subscribe(list => this.list = list);
    this.messageService.add(`sauvegarde de la liste`);
  }

  saveText(entry: Entry, newText: string) {
    if (newText) {
      entry.text = newText;
      this.save();
    }
  }

  saveWeight(entry: Entry, newWeight: number) {
    entry.weight = newWeight;
    this.save();
  }

  addEntry(entries: Entry[]) {
    const newEntry: Entry = new Entry();
    newEntry.weight = 0;
    newEntry.text = 'new entry';

    entries.push(newEntry);
  }

  drop(event: CdkDragDrop<Entry[], any>) {
    if (event.isPointerOverContainer) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {

        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    } else {
      console.log('ALLO ??');
      event.previousContainer.data.splice(event.previousIndex, 1);
      event.previousContainer.removeItem(event.item);
    }

    this.save();
  }
}
