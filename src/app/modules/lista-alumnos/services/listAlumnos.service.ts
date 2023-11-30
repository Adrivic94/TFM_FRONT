import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';



@Injectable({
  providedIn: 'root'
})
export class ListaAlumnosService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  httpClient = inject(HttpClient);

  constructor() { }

  getAlumnosByProfesorId(usuarioId: number): Promise<SolicitudClase[]> {
    return lastValueFrom(this.httpClient.get<SolicitudClase[]>(`${this.baseUrl}${usuarioId}/alumnos`));
  }


}