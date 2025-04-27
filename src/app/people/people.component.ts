import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  trendingPeople: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTrendingPeople();
  }

  fetchTrendingPeople(): void {
    const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmNjJiODUxNjQ3MTczYjJkNGY0YmU0YjRlNDkxNyIsIm5iZiI6MTc0NTYxNjEwMS43NzUsInN1YiI6IjY4MGJmY2U1NDFhMzgyZDZhMDg5ZDVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQqcn-4tgShwR3vN-Wjc-mrDcmKbaiRJk65MVmKZoSI'
    });

    this.http.get<{ results: any[] }>(url, { headers }).subscribe({
      next: (response) => {
        this.trendingPeople = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error fetching people:', err);
      }
    });
  }

  getKnownForTitles(person: any): string {
    // Check different possible locations for known_for data
    const knownFor = person.known_for || person.known_for_department || person.known_for_movies;
    
    if (!knownFor) {
      return 'Not specified';
    }
  
    // Handle case where knownFor is an array of works
    if (Array.isArray(knownFor)) {
      const titles = knownFor
        .map(item => item?.title || item?.name || item?.original_title)
        .filter(title => title);
      return titles.length > 0 ? titles.join(', ') : 'Various works';
    }
  
    // Handle case where knownFor is a string (department)
    if (typeof knownFor === 'string') {
      return knownFor;
    }
  
    return 'Various works';
  }
}