import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { HomeComponent } from '../../core/home/home.component';

const routes: Routes = [
  { path: '', component: ListSuggestionComponent },
  { path: ':id', component: SuggestionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }