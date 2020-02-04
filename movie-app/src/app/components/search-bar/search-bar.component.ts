import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() keyword: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEnter(keyword) {
    this.keyword.emit(keyword);
  }

}
