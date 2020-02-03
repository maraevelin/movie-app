import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string = null;

  constructor(
    private route: ActivatedRoute,
    /*
    private location: Location
    */
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
