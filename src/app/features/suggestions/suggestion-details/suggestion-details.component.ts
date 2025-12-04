import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

const SUGGESTIONS_MOCK: Suggestion[] = [
  { 
    id: 1, 
    title: 'Organiser une journée team building', 
    description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
    category: 'Événements', 
    date: new Date('2025-01-20'), 
    status: 'acceptee' 
  },
  { 
    id: 2, 
    title: 'Améliorer le système de réservation', 
    description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
    category: 'Technologie', 
    date: new Date('2025-01-15'), 
    status: 'refusee' 
  },
  { 
    id: 3, 
    title: 'Créer un système de récompenses', 
    description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
    category: 'Ressources Humaines', 
    date: new Date('2025-01-25'), 
    status: 'refusee' 
  },
  { 
    id: 4, 
    title: 'Moderniser l\'interface utilisateur', 
    description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
    category: 'Technologie', 
    date: new Date('2025-01-30'), 
    status: 'en_attente' 
  },
  { 
    id: 5, 
    title: 'Formation à la sécurité informatique', 
    description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
    category: 'Formation', 
    date: new Date('2025-02-05'), 
    status: 'acceptee' 
  },
];

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion?: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const suggestionTrouvee = SUGGESTIONS_MOCK.find(s => s.id === +id);
      if (suggestionTrouvee) {
        this.suggestion = suggestionTrouvee;
      } else {
        this.router.navigate(['/suggestions']);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }
}