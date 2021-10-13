import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ChoiceList} from '../model/ChoiceList';
import {MessageService} from './message.service';

@Injectable({providedIn: 'root'})
export class ListService {

  private listsUrl = 'http://localhost:8080/choicr/lists';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getList(id: string): Observable<ChoiceList> {
    const url = `${this.listsUrl}/${id}`;
    const list = this.http.get<ChoiceList>(url).pipe(
      tap(_ => this.log(`fetched list name=${id} and url=${url} and list=${list}`)),
      catchError(this.handleError<ChoiceList>(`getList error id=${id}`))
    );
    return list;
  }

  //////// Save methods //////////

  addList(choiceList: ChoiceList): Observable<ChoiceList> {
    return this.http.post<ChoiceList>(this.listsUrl, choiceList, this.httpOptions).pipe(
      tap((newList: ChoiceList) => this.log(`added list w/ name=${newList.id}`)),
      catchError(this.handleError<ChoiceList>('addHero'))
    );
  }

  deleteList(id: string): Observable<ChoiceList> {
    const url = `${this.listsUrl}/${id}`;

    return this.http.delete<ChoiceList>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<ChoiceList>('deleteHero'))
    );
  }

  updateList(list: ChoiceList): Observable<ChoiceList> {
    return this.http.put<ChoiceList>(this.listsUrl, list, this.httpOptions).pipe(
      tap(_ => this.log(`updated list name=${list.name}`)),
      catchError(this.handleError<any>('Update list failed'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ListService: ${message}`);
  }
}
