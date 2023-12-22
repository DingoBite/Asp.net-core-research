import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private route: ActivatedRoute = new ActivatedRoute();
  private id: string | null = null;

  constructor(private router: Router) {
  }

  redirectToPage(baseURL: string): void {
    this.router.navigate([baseURL], {relativeTo: this.route})
      .then(r => console.log(`Redirected state:${r}`));
  }

  redirectToPageWithId(baseURL: string, id: number): void {
    this.router.navigate([baseURL, id], {relativeTo: this.route})
      .then(r => console.log(`Redirected state:${r}`));
  }

  redirectToPageWithCurrentId(baseURL: string): void {
    const id = this.getURLIdParam();
    if (id == null) {
      console.error(`Cannot get id from url: ${this.route.url}`);
      return;
    }
    this.router.navigate([baseURL, id], {relativeTo: this.route})
      .then(r => console.log(`Redirected state:${r}`));
  }

  getURLIdParam(): number | null {
    console.log(this.route.snapshot.params);
    if (this.id == null)
      return null;
    return parseInt(this.id);
  }

  makeIdEndpointWithCurrentId(url: string): string | null {
    const id = this.getURLIdParam();
    if (id == null) {
      console.error(`Cannot get id from url: ${this.route.url}`);
      return null;
    }
    return url + `/${id}`;
  }

  init(route: ActivatedRoute) {
    this.route = route;
    this.route.paramMap.subscribe(
      params => {
        return this.id = params.get("id");
      }
    );
  }
}
