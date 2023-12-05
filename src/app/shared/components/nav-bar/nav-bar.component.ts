import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from 'src/app/core/interceptors/interfaces/pay-load';
import { ClasesService } from 'src/app/core/services/clases.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public userId!: number;
  router = inject(Router);
  public userService = inject(UsersService);
  private token: string | null = null;

  ngOnInit(): void {
    this.userService.tokenChange.subscribe((newToken) => {
      this.token = newToken;
      if (this.token) {
        let decodedToken = jwtDecode<PayLoad>(this.token);
        this.userId = decodedToken.user_id;
      }
    });

  clasesService = inject(ClasesService)
  msg:string|any

  ngOnInit(): void {
    this.token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
    if(this.userId){
      this.obtenerDatos()
    }
    
  }
  async obtenerDatos():Promise<any>{
    try {
      const response = await this.clasesService.getDatosUsuario(this.userId)
      this.msg = `Bienvenido ${response[0].rol == "prof" ? "profesor" : "alumno"} ${response[0].nombre} ${response[0].apellidos}! 😊`
    } catch (error) {
      alert(error)
    }
  }

  onClickLogOut() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres desconectarte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desconectar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario ha confirmado la desconexión
        this.userService.logOut();
        this.userService.clearUserId();
        this.router.navigate(['auth', 'login'], {
          queryParams: [],
        });
      }
    });
    this.msg =undefined
  }
  
}
