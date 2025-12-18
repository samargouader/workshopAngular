import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  suggestionId?: number;
  isEdit = false;
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
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[A-ZÀ-ÖØ-Ý][A-Za-zÀ-ÖØ-öø-ÿ\s'-]*$")]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      date: [{ value: this.today, disabled: true }],
      status: [{ value: this.statusDefault, disabled: true }]
    });

    const idParam = this.actRoute.snapshot.params['id'];
    if (idParam) {
      this.suggestionId = +idParam;
      const suggestion = this.suggestionService.findById(this.suggestionId);
      if (suggestion) {
        this.isEdit = true;
        this.suggestionForm.patchValue({
          title: suggestion.title,
          description: suggestion.description,
          category: suggestion.category
        });
      }
    }
  }

  get f() { return this.suggestionForm.controls; }

  onSubmit(): void {
    if (this.suggestionForm.invalid) {
      this.suggestionForm.markAllAsTouched();
      return;
    }

    const payload: Suggestion = {
      id: this.suggestionId ?? 0,
      title: this.f['title'].value,
      description: this.f['description'].value,
      category: this.f['category'].value,
      date: this.today,
      status: this.statusDefault,
      nbLikes: 0
    };

    if (this.isEdit && this.suggestionId) {
      // Try server update
      this.suggestionService.updateSuggestion(payload).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: err => {
          console.error('Failed to update on server, updating local copy', err);
          this.suggestionService.updateSuggestionLocal(payload);
          this.router.navigate(['/suggestions']);
        }
      });
    } else {
      // Try server add
      this.suggestionService.addSuggestion(payload).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: err => {
          console.error('Failed to add on server, adding local copy', err);
          this.suggestionService.addSuggestionLocal(payload);
          this.router.navigate(['/suggestions']);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/suggestions']);
  }

}
