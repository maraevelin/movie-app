import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Movie } from 'src/app/movie/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit() {}

  onSelect(id: string) {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.router.navigate([`/movies/${id}`]);
      });
    }, 125);
  }
}
