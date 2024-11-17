import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [

    // {
    //   group: 'Autenticacion',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/figma-ui/user.svg',
    //       label: 'Usuarios',
    //       route: '/user/list',
    //     },

    //   ],
    // },
    {
      group : 'Medicos',
      separator : true,
      items : [

        {
          icon: 'assets/icons/figma-ui/doctor.svg',
          label: 'Medicos',
          route: '/doctor/list',
        },
        {
          icon: 'assets/icons/figma-ui/specialty.svg',
          label: 'Horarios',
          route: '/doctor/schedules',
        },
        {
          icon: 'assets/icons/figma-ui/specialty.svg',
          label: 'Especialidades',
          route: '/doctor/specialties',
        },
        {
          icon : 'assets/icons/figma-ui/consultory.svg',
          label: 'Consultorios',
          route :'/doctor/consulting-room'
        }
      ]
    },
    {
      group : 'Asegurados',
      separator : true,
      items : [
        {
          icon: 'assets/icons/figma-ui/doctor.svg',
          label: 'Asegurados',
          route: '/patient/list',
        },
        {
          icon: 'assets/icons/figma-ui/calendar.svg',
          label: 'Citas',
          route: '/patient/appointments',
        },


      ]
    },
  ];
}
