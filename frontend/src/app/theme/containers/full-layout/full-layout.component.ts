import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, UrlTree} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  public display = false;

  public items :MenuItem[]=[];

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  constructor(private authService: AuthService,
              public route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

  createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[]  {
    const children = route.children[0].snapshot.routeConfig.children;

    if (children.length === 0) {
      return breadcrumbs;
    }


    for(let i=1; i<children.length; i++) {
      const routeURL: string = children[i].path;
      if (routeURL !== '') {
        url += '/'+routeURL;
      }

      const label = children[i].data[FullLayoutComponent.ROUTE_DATA_BREADCRUMB];
      if (label !== null && label !== undefined ) {
        breadcrumbs.push({label, url});
      }
    }
    return breadcrumbs;
  }




}
