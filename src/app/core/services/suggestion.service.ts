import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  // In-memory list used for Part 1 of the workshop
  private suggestionList: Suggestion[] = [
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
      title: 'Créer un système de récompenses',
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

  suggestionUrl = 'http://localhost:3000/suggestions'; // for Part 2

  private idCounter = this.suggestionList.reduce((acc, s) => Math.max(acc, s.id), 0);

  constructor(private http: HttpClient) {}

  // Part 1 method: synchronous in-memory access
  getSuggestionList(): Suggestion[] {
    return this.suggestionList.map(s => ({ ...s }));
  }

  findById(id: number): Suggestion | undefined {
    return this.suggestionList.find(s => s.id === id);
  }

  addSuggestionLocal(s: Suggestion): Suggestion {
    this.idCounter++;
    const newS = { ...s, id: this.idCounter };
    this.suggestionList.push(newS);
    return newS;
  }

  updateSuggestionLocal(s: Suggestion): void {
    const idx = this.suggestionList.findIndex(x => x.id === s.id);
    if (idx !== -1) {
      this.suggestionList[idx] = { ...s };
    }
  }

  deleteSuggestionLocal(id: number): void {
    this.suggestionList = this.suggestionList.filter(s => s.id !== id);
  }

  // Part 2 methods: HTTP-based CRUD using HttpClient
  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  addSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, s);
  }

  updateSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${s.id}`, s);
  }

  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  updateNbLikes(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}
