import { Directive, OnInit } from '@angular/core';

import { DestroyableDirective } from '../directives/destroyable.directive';

@Directive()
export abstract class ListPageComponent<T>
  extends DestroyableDirective
  implements OnInit
{
  public currentPage: number = 1;
  public listItems: T[] = [];
  public isLoading: boolean = false;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.load();
  }

  public onScroll(): void {
    this.currentPage += 1;
    this.load();
  }

  protected abstract load(): void;
}
