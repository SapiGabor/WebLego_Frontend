import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Lego } from "./lego";

@Injectable({
    providedIn: 'root'
})
export class LegoService{
    private apiServerUrl =  environment.apiBaseUrl;
    
    constructor(private http: HttpClient){ }

    public getLegos(): Observable<Lego[]>{
        return this.http.get<any>(`${this.apiServerUrl}/lego/all`);
    }

    public addLego(lego: Lego): Observable<Lego>{
        return this.http.post<any>(`${this.apiServerUrl}/lego/add`, lego);
    }

    public updateLego(lego: Lego): Observable<Lego>{
        return this.http.put<any>(`${this.apiServerUrl}/lego/update`, lego);
    }

    public deleteLego(legoId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/lego/delete/${legoId}`);
    }
}