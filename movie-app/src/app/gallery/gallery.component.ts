import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../services/models/Movie';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() movies: Movie[] =  [];

  constructor() {
    console.log(typeof this.movies);
    console.table(this.movies);
  }

  ngOnInit() {
  }
}
