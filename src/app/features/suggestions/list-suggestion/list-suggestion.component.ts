import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

interface SuggestionAvecActions extends Suggestion {
  isFavorite: boolean;
}

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  suggestions: SuggestionAvecActions[] = [];
  favoris: SuggestionAvecActions[] = [];
  recherche = '';

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    // Part 2: fetch from backend via HttpClient
    this.loadFromServer();
  }

  private loadFromServer(): void {
    this.suggestionService.getSuggestions().subscribe({
      next: list => this.suggestions = list.map((s: Suggestion) => ({ ...s, isFavorite: false })),
      error: err => {
        console.error('Failed to load suggestions from server, falling back to local list', err);
        // fallback to local list
        this.suggestions = this.suggestionService.getSuggestionList().map((s: Suggestion) => ({ ...s, isFavorite: false }));
      }
    });
  }

  deleteSuggestion(id: number): void {
    // Try HTTP delete first
    this.suggestionService.deleteSuggestion(id).subscribe({
      next: () => this.loadFromServer(),
      error: err => {
        console.error('Failed to delete on server, deleting local copy', err);
        this.suggestionService.deleteSuggestionLocal(id);
        this.suggestions = this.suggestionService.getSuggestionList().map((s: Suggestion) => ({ ...s, isFavorite: false }));
      }
    });
  }

  get suggestionsFiltrees(): SuggestionAvecActions[] {
    if (!this.recherche.trim()) {
      return this.suggestions;
    }
    const terme = this.recherche.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(terme) ||
      s.category.toLowerCase().includes(terme)
    );
  }

  getLikes(s: SuggestionAvecActions): number {
    return s.nbLikes;
  }

  estFavori(s: SuggestionAvecActions): boolean {
    return s.isFavorite;
  }

  liker(s: SuggestionAvecActions): void {
    const newLikes = s.nbLikes + 1;

    // Try to update on server
    this.suggestionService.updateNbLikes(s.id, newLikes).subscribe({
      next: updated => {
        s.nbLikes = updated.nbLikes;
      },
      error: err => {
        console.error('Failed to update likes on server, updating local copy', err);
        s.nbLikes = newLikes;
        this.suggestionService.updateSuggestionLocal(s);
      }
    });
  }

  ajouterAuxFavoris(s: SuggestionAvecActions): void {
    if (!s.isFavorite) {
      s.isFavorite = true;
      this.favoris.push(s);
    }
  }
}