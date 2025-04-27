import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
  providers: [DatePipe]
})
export class TvComponent implements OnInit {
  trendingTvShows: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchTrendingTvShows();
  }

  fetchTrendingTvShows(): void {
    const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmNjJiODUxNjQ3MTczYjJkNGY0YmU0YjRlNDkxNyIsIm5iZiI6MTc0NTYxNjEwMS43NzUsInN1YiI6IjY4MGJmY2U1NDFhMzgyZDZhMDg5ZDVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQqcn-4tgShwR3vN-Wjc-mrDcmKbaiRJk65MVmKZoSI'
    });

    this.http.get<{ results: any[] }>(url, { headers }).subscribe({
      next: (response) => {
        this.trendingTvShows = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error fetching TV shows:', err);
      }
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}