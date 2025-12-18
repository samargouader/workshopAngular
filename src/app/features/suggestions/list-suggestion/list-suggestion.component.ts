import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

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
    // Fetch suggestions from the service
    this.suggestions = this.suggestionService.getAll().map((s: Suggestion) => ({ ...s, isFavorite: false }));
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
    s.nbLikes++;
    this.suggestionService.update(s);
  }

  ajouterAuxFavoris(s: SuggestionAvecActions): void {
    if (!s.isFavorite) {
      s.isFavorite = true;
      this.favoris.push(s);
    }
  }
}