import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubRepo } from '../interfaces/github-repo.interface';

@Injectable()
export class GithubReposService {
  private reposList$: BehaviorSubject<GithubRepo[]> = new BehaviorSubject<
    GithubRepo[]
  >([]);
  private selectedRepo$: BehaviorSubject<GithubRepo | null> =
    new BehaviorSubject<GithubRepo | null>(null);
  private selectedRepoId$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  public setReposList(reposList: GithubRepo[]): void {
    this.reposList$.next(reposList);
  }

  public getReposList(): Observable<GithubRepo[]> {
    return this.reposList$.asObservable();
  }

  public selectRepo(repo: GithubRepo | null): void {
    this.selectedRepo$.next(repo);
  }

  public getSelectedRepo(): Observable<GithubRepo | null> {
    return this.selectedRepo$.asObservable();
  }

  public getCachedRepoById(id: number): GithubRepo | null {
    return (
      this.reposList$.value.find((repo: GithubRepo) => repo.id === id) || null
    );
  }

  public getSelectedRepoId(): Observable<number | null> {
    return this.selectedRepoId$.asObservable();
  }

  public setSelectedRepoId(id: number | null): void {
    return this.selectedRepoId$.next(id);
  }
}
