import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User, Usuario } from '../interfaces/usario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: User;

  public urlBase: string = environment.baseUrl;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  registrarNuevoUsuario(email: string, password: string, name: string) {
    const url = `${this.urlBase}/auth/new`;
    const body = { email, password, name };

    return this.http.post<Usuario>(url, body).pipe(
      tap(({ok, token}) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(email: string, password: string) {
    const url = `${this.urlBase}/auth`;
    const body = { email, password };

    return this.http.post<Usuario>(url, body).pipe(
      tap((res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token!);
        }
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.urlBase}/auth/renew`;
    // creamos headers de la peticion con el nombre del hader personalizado y obtenemos el token del localstorage
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<Usuario>(url, { headers }).pipe(
      map((res) => {
        localStorage.setItem('token', res.token!);
        this._usuario = {
          name: res.name!,
          uid: res.uid!,
          email:  res.email!
        };
        return res.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logaout() {
    localStorage.clear();
  }
}
