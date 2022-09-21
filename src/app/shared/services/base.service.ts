import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Student} from "../../learning/model/student";

export class BaseService<T> {
  // Resource Endpoint
  basePath = ' http://localhost:3000/api/v1/resources';

  // Common options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Create Resource
  create(item: any): Observable<T> {
    return this.http.post<T>(
      this.basePath,
      JSON.stringify(item),
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Resource by id
  getById(id: any): Observable<T> {
    return this.http.get<T>(
      `${this.basePath}/${id}`,
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Resources
  getAll(): Observable<T> {
    return this.http.get<T>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Resource
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.basePath}/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
