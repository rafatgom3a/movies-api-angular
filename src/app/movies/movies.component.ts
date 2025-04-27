import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies(): void {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmNjJiODUxNjQ3MTczYjJkNGY0YmU0YjRlNDkxNyIsIm5iZiI6MTc0NTYxNjEwMS43NzUsInN1YiI6IjY4MGJmY2U1NDFhMzgyZDZhMDg5ZDVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQqcn-4tgShwR3vN-Wjc-mrDcmKbaiRJk65MVmKZoSI'
    });

    this.http.get<{ results: any[] }>(url, { headers }).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error fetching movies:', err);
      }
    });
  }
}