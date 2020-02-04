import { Component, OnInit, Input } from '@angular/core';
import { MovieResponse } from 'src/app/services/models/MovieResponse';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() movies: MovieResponse[] =  [];

  constructor() {
    console.log(typeof this.movies);
    console.table(this.movies);
  }

  ngOnInit() {
  }
}
