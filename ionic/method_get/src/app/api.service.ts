import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  detailData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`);
  }

  postDatacart(data: any): Observable<any> {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/cart`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error in postDatacart:', error);
        return throwError(error);
      })
    );
  }

  postDataOrder(data: any): Observable<any> {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/cart/cekout`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error in postDatacart:', error);
        return throwError(error);
      })
    );
  }

  showDataCart(id: string) {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return this.http.get<any>(`${this.apiUrl}/cart/show/${id}`, { headers });
  }

  showDataProfile(id: string) {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return this.http.get<any>(`${this.apiUrl}/profile/${id}`, { headers });
  }

  putDataProfile(id: any, data: any): Observable<any> {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/profile/${id}`, data, { headers });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  showDataRiwayat(id: string) {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return this.http.get<any>(`${this.apiUrl}/riwayat/${id}`, { headers });
  }

  cekSesi() {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return this.http.get<any>(`${this.apiUrl}/auth/me`, { headers });
  }

  logout() {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    localStorage.clear();
    return this.http.get<any>(`${this.apiUrl}/auth/keluar`, { headers });
  }

  wa(number: any) {
    const storedData = localStorage.getItem('data');
    let token: string | null = null;
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return throwError('Error parsing stored data');
      }
    }

    if (!token) {
      throwError('Token is not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return this.http.get<any>(`${this.apiUrl}/wa/${number}`, { headers });
  }
}
