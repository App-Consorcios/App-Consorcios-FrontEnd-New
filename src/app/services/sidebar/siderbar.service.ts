import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any = [
    {
      titulo: 'Perfil',
      icono: 'fa fa-user',
      url:'/perfil',
      submenu:[]
    },
    {
      titulo:'Principal',
      submenu:[
        {
          titulo:'Unidad Funcional',
          url:'/unidad-funcional',
          icono:'fa fa-home menu-icon',
          action:[
            {
              titulo: 'Crear Unidad',
              icono: 'fa fa-2x  fa-edit  icon-navbar text-success',
              url:'/unidad-funcional/crear-unidad',
            },
            {
              titulo: 'Asignar Unidades',
              icono: 'fa fa-2x fa-check  icon-navbar text-warning',
              url:'/unidad-funcional/asignar-unidad',
            },
            {
              titulo: 'Ver Unidades',
              icono: 'fa fa-2x fa-eye  icon-navbar text-info',
              url:'/unidad-funcional/ver-unidades',
            }
          ]
        },
        {
          titulo:'Expensas',
          url:'/expensas',
          icono:'fa fa-2x fa-chart-line menu-icon',
          action:[
            {
              titulo: 'Crear categorias',
              icono: 'fa fa-2x fa-edit icon-navbar text-success',
              url:'/expensas/crear-expensas',
            },
            {
              titulo: 'Crear detalle',
              icono: 'fa fa-2x fa-file-alt icon-navbar text-warning',
              url:'/expensas/detalle-expensas',
            },
            {
              titulo: 'Calcular Expensas',
              icono: 'fa fa-2x fa-calculator icon-navbar text-danger',
              url:'/expensas/calcular-expensas',
            },
            {
              titulo: 'Ver Expensas',
              icono: 'fa fa-2x fa-eye icon-navbar text-info',
              url:'/expensas/ver-expensas',
            }

          ]
        },
        {
          titulo:'Reuniones',
          url:'/reuniones',
          icono:'fa fa-2x fa-users menu-icon',
          action:[
            {
              titulo: 'Crear Reuniones',
              icono: 'fa fa-2x fa-edit icon-navbar text-success',
              url:'/reuniones/crear-reuniones',
            },
            {
              titulo: 'Ver Reuniones',
              icono: 'fa fa-2x fa-eye icon-navbar text-info',
              url:'/reuniones/ver-reuniones',
            }
            ,
            {
              titulo: 'Agendar Reuniones',
              icono: 'fa fa-2x fa-calendar icon-navbar text-warning',
              url:'/reuniones/agendar-reuniones',
            }
          ]
        },
        {
          titulo:'Estadísticas',
          icono:'mdi mdi-chart-bar menu-icon',
          url:'/estadistica',
          action:[
            {
              titulo: 'Crear Estadísticas',
              icono: 'fa fa-2x fa-edit icon-navbar text-success',
              url:'/estadistica/crear-estadisticas',
            },
            {
              titulo: 'Ver Estadísticas',
              icono: 'fa fa-2x fa-eye icon-navbar text-info',
              url:'/estadistica/ver-estadisticas',
            }
          ]
        },
      ]
    },
    {
      titulo:'Mentenimiento',
      url:'/principal',
      submenu:[
        {
          titulo:'Consorcios',
          icono:'fa fa-building menu-icon icon-navbar',
          url:'/consorcios',
          action:[
            {
              titulo: 'Crear Consorcio',
              icono: 'fa fa-2x fa-edit icon-navbar text-success',
              url:'/consorcios/crear-consorcio',
            },
            {
              titulo: 'Ver Consorcios',
              icono: 'fa fa-2x fa-eye icon-navbar text-info',
              url:'/consorcios/ver-consorcios',
            }
          ]
        },
        {
          titulo:'Usuarios',
          icono:'fa fa-briefcase menu-icon',
          url:'/usuarios',
          action:[
            {
              titulo: 'Asignar roles',
              icono: 'fa fa-2x fa-edit icon-navbar text-info',
              url:'/usuarios/ver-usuarios',
            }
            // ,
            // {
            //   titulo: 'Ver roles',
            //   icono: 'fa fa-2x fa-eraser icon-navbar text-danger',
            //   url:'/usuarios/eliminar-usuario',
            // }
          ]
        }
      ]
    }
  ];

  constructor() { }
  cargarMenu(route:any,agrupador:any){
    if(route>=0 && agrupador>=0) return this.menu[agrupador].submenu[route]

    return this.menu ;
  }
}
