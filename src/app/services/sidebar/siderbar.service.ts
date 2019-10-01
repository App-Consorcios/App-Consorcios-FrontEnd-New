import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any = [
    {
      titulo: 'Perfil',
      icono: 'fa fa-user',
      url:'/perfil'
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
              icono: 'fa fa-2x  fa-edit  icon-navbar',
              url:'/unidad-funcional/crear-unidad',
            },
            {
              titulo: 'Ver Unidades',
              icono: 'fa fa-2x fa-eye  icon-navbar',
              url:'/unidad-funcional/ver-unidades',
            }
            ,
            {
              titulo: 'Asignar Unidades',
              icono: 'fa fa-2x fa-check  icon-navbar',
              url:'/unidad-funcional/asignar-unidad',
            }
          ]
        },
        {
          titulo:'Expensas',
          url:'/expensas',
          icono:'fa fa-2x fa-chart-line menu-icon',
          action:[
            {
              titulo: 'Crear Expensas',
              icono: 'fa fa-2x fa-edit icon-navbar',
              url:'/expensas/crear-expensas',
            },
            {
              titulo: 'Ver Expensas',
              icono: 'fa fa-2x fa-eye icon-navbar',
              url:'/expensas/ver-expensas',
            }
            ,
            {
              titulo: 'Calcular Expensas',
              icono: 'fa fa-2x fa-calculator icon-navbar',
              url:'/expensas/calcular-expensas',
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
              icono: 'fa fa-2x fa-edit icon-navbar',
              url:'/reuniones/crear-expensas',
            },
            {
              titulo: 'Ver Reuniones',
              icono: 'fa fa-2x fa-eye icon-navbar',
              url:'/reuniones/ver-reuniones',
            }
            ,
            {
              titulo: 'Agendar Reuniones',
              icono: 'fa fa-2x fa-calendar icon-navbar',
              url:'/reuniones/agendar-expensas',
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
              icono: 'fa fa-2x fa-edit icon-navbar',
              url:'/estadistica/crear-estadisticas',
            },
            {
              titulo: 'Ver Estadísticas',
              icono: 'fa fa-2x fa-eye icon-navbar',
              url:'/estadistica/ver-estadisticas',
            }
          ]
        },
      ]
    },
    {
      titulo:'Mentenimiento',
      submenu:[
        {
          titulo:'Consorcios',
          icono:'fa fa-building menu-icon icon-navbar',
          url:'/consorcios',
          action:[
            {
              titulo: 'Crear Consorcio',
              icono: 'fa fa-2x fa-edit icon-navbar',
              url:'/crear-consorcio',
            },
            {
              titulo: 'Ver Consorcios',
              icono: 'fa fa-2x fa-eye icon-navbar',
              url:'/ver-consorcios',
            }
          ]
        },
        {
          titulo:'Usuarios',
          icono:'fa fa-briefcase menu-icon',
          url:'/usuarios',
          action:[
            {
              titulo: 'Ver Usuarios',
              icono: 'fa fa-2x fa-edit icon-navbar',
              url:'/ver-usuarios',
            },
            {
              titulo: 'Eliminar Usuario',
              icono: 'fa fa-2x fa-eraser icon-navbar',
              url:'/eliminar-usuario',
            }
          ]
        }
      ]
    }
  ];

  constructor() { }
  cargarMenu(route:any,agrupador:any){
    if(route>=0 && agrupador>0) return this.menu[agrupador].submenu[route]
    return this.menu ;
  }
}
