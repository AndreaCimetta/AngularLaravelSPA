import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {MenuItem} from 'primeng/api';
import {filter} from "rxjs/operators";
import {RoutesMenu} from "../../../models/routes";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  public display = false;

  public routesMenu : RoutesMenu[] = [
    {
      name: 'Search',
      url: '/search',
      icon: 'pi pi-search'
    },
    {
      name: 'User List',
      url: '/user-list',
      icon: 'pi pi-users'
    },
    {
      name: 'Post List',
      url: '/post-list',
      icon: 'pi pi-clone'
    }
  ];



  public menuToggle :MenuItem[]=[];

  public items :MenuItem[]=[];

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  constructor(private authService: AuthService,
              public route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.menuToggle = [
      {
        label: 'UserList',
        url: '/#/user-list'
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Edit', icon: 'pi pi-fw pi-user-edit'}
        ]
      }
    ];





    console.log(this.route.url);

    this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.items = this.createBreadcrumbs(this.activatedRoute.root));
  }

  logout(){
    this.authService.logout().subscribe(()=>{

      window.location.reload();
    });

  }

  // createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[]  {
  //   const children = route.children[0].snapshot.routeConfig.children;
  //   // [0].snapshot.children
  //
  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }
  //
  //
  //   for(let i=1; i<children.length; i++) {
  //     const routeURL: string = children[i].path;
  //     if (routeURL !== '') {
  //       url += '/'+routeURL;
  //     }
  //
  //     const label = children[i].data[FullLayoutComponent.ROUTE_DATA_BREADCRUMB];
  //     if (label !== null && label !== undefined ) {
  //       breadcrumbs.push({label, url});
  //     }
  //   }
  //   return breadcrumbs;
  // }


  private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[FullLayoutComponent.ROUTE_DATA_BREADCRUMB];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }


}
