import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

const STORAGE_KEY = 'suggestions_v1';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 0
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: "Créer un système de récompenses",
      description: "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: "Organisation d'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.",
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      nbLikes: 0
    }
  ];

  private idCounter = this.suggestions.reduce((acc, s) => Math.max(acc, s.id), 0);

  getAll(): Suggestion[] {
    // return a copy to avoid external mutation
    return this.suggestions.map(s => ({ ...s }));
  }

  add(s: Suggestion): Suggestion {
    this.idCounter++;
    const newSuggestion: Suggestion = {
      ...s,
      id: this.idCounter
    };
    this.suggestions.push(newSuggestion);
    return newSuggestion;
  }

  update(s: Suggestion): void {
    const idx = this.suggestions.findIndex(ss => ss.id === s.id);
    if (idx !== -1) {
      this.suggestions[idx] = { ...s };
    }
  }

  findById(id: number): Suggestion | undefined {
    return this.suggestions.find(s => s.id === id);
  }
}
