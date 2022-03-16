import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  url = 'http://localhost:8080/api/veiculos'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getVeiculos(): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError) 
      )
  }

  getVeiculoById(id: String): Observable<Veiculo> {
    return this.httpClient.get<Veiculo>(this.url+'/'+id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  postVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.post<Veiculo>(this.url, JSON.stringify(veiculo), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  putVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.put<Veiculo>(this.url+'/'+veiculo._id, JSON.stringify(veiculo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteVeiculo(veiculo: Veiculo) {
    return this.httpClient.delete<Veiculo>(this.url+'/'+veiculo._id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }

}
