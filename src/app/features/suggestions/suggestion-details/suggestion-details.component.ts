import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';
@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion?: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      // Try to get from server first
      this.suggestionService.getSuggestionById(id).subscribe({
        next: s => this.suggestion = s,
        error: err => {
          console.error('Failed to get suggestion from server, fallback to local', err);
          const suggestionTrouvee = this.suggestionService.getSuggestionList().find(s => s.id === id);
          if (suggestionTrouvee) {
            this.suggestion = suggestionTrouvee;
          } else {
            this.router.navigate(['/suggestions']);
          }
        }
      });
    });
  }


  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  deleteSuggestion(): void {
    if (!this.suggestion) { return; }
    this.suggestionService.deleteSuggestionLocal(this.suggestion.id);
    this.router.navigate(['/suggestions']);
  }

  updateSuggestion(): void {
    if (!this.suggestion) { return; }
    // navigate to edit form (route defined below)
    this.router.navigate(['/suggestions', 'edit', this.suggestion.id]);
  }

  next(): void {
    const list = this.suggestionService.getSuggestionList();
    if (!this.suggestion) { return; }
    const idx = list.findIndex(s => s.id === this.suggestion!.id);
    if (idx === -1) { return; }
    const nextIndex = (idx + 1) % list.length;
    const nextId = list[nextIndex].id;
    this.router.navigate(['/suggestions', nextId]);
  }
}