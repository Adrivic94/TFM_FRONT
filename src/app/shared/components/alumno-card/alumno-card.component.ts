import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEspecialidad } from 'src/app/core/models/Especialidad.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { PeticionClasesService } from 'src/app/core/services/peticionClases.service';

@Component({
  selector: 'app-alumno-card',
  templateUrl: './alumno-card.component.html',
  styleUrls: ['./alumno-card.component.css']
})
export class AlumnoCardComponent {

  @Input() miUsuario!: SolicitudClase;

  especialidades: IEspecialidad[] | any = [];

  activatedRoute = inject(ActivatedRoute);
  peticionClasesServices = inject(PeticionClasesService);


  async ngOnInit(): Promise<void> {

    //recuperamos las especialidades del profesor
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.peticionClasesServices.getEspecialidadesByProfesorId(id).subscribe(data => {
        this.especialidades = data;
        
        this.mostrarNombreEspecialidad();
      })
    });

  }

  // Método para obtener el nombre de la especialidad por su ID.
  obtenerNombreEspecialidad(especialidadId: number): string {
    const especialidad = this.especialidades.find((especialidad: IEspecialidad) => especialidad.id === especialidadId);

    return especialidad ? especialidad.especialidad : 'Especialidad no encontrada';
  }

  // Método para mostrar el nombre de la especialidad al acceder a la página
  mostrarNombreEspecialidad() {
    const especialidadId = this.miUsuario.especialidades_id;
    const nombreEspecialidad = this.obtenerNombreEspecialidad(especialidadId);

    return nombreEspecialidad;

    }
  }
