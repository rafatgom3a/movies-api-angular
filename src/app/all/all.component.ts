import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [CommonModule], // Required for common directives
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  trendingData: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTrendingData();
  }

  fetchTrendingData(): void {
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmNjJiODUxNjQ3MTczYjJkNGY0YmU0YjRlNDkxNyIsIm5iZiI6MTc0NTYxNjEwMS43NzUsInN1YiI6IjY4MGJmY2U1NDFhMzgyZDZhMDg5ZDVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQqcn-4tgShwR3vN-Wjc-mrDcmKbaiRJk65MVmKZoSI'
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.trendingData = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error fetching data:', err);
      }
    });
  }
}