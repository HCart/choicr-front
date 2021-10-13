import {Component, OnInit} from '@angular/core';
import {ChoiceList} from '../model/ChoiceList';
import {ListService} from '../service/list.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: ChoiceList;

  constructor(private listService: ListService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
  }
}
