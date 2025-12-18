import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  today = new Date();
  statusDefault = 'en attente';

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      date: [{ value: this.today, disabled: true }],
      status: [{ value: this.statusDefault, disabled: true }]
    });
  }

  get f() { return this.suggestionForm.controls; }

  onSubmit(): void {
    if (this.suggestionForm.invalid) {
      this.suggestionForm.markAllAsTouched();
      return;
    }

    const newSuggestion: Suggestion = {
      id: 0, // service will set id
      title: this.f['title'].value,
      description: this.f['description'].value,
      category: this.f['category'].value,
      date: this.today,
      status: this.statusDefault,
      nbLikes: 0
    };

    this.suggestionService.add(newSuggestion);
    // Redirect to list
    this.router.navigate(['/suggestions']);
  }

  cancel(): void {
    this.router.navigate(['/suggestions']);
  }

}
