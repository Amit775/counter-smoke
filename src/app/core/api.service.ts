import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISmoke } from "./store/smokes.store";

@Injectable({ providedIn: 'root' })
export class ApiService {
    baseUrl = 'http://localhost:3000/smokes';
    constructor(private http: HttpClient) { }

    newSmoke(smoke: ISmoke): Observable<ISmoke> {
        return this.http.post<ISmoke>(this.baseUrl, smoke);
    }

    getSmokes(): Observable<ISmoke[]> {
        return this.http.get<ISmoke[]>(this.baseUrl);
    }
}