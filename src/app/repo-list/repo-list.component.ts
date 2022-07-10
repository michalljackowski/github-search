import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { LinkHeaderHelper } from '../core/helpers/link-header.helper';
import { RepositoriesService } from '../core/services/repositories.service';
import { Repository } from './../core/models/repository.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  repositories: Repository[] | null = [];
  userName = '';
  repositoriesPerPage = 5;
  apiPages!: number;
  nextApiPage!: number;
  prevApiPage!: number;
  currentPage = 1;
  noRepos: boolean = false;
  nextPageUrl = '';
  previousPageUrl = '';

  constructor(
    protected repositoriesService: RepositoriesService,
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.route.queryParams
      .pipe(mergeMap(params => {
        this.userName = params.userName;
        return this.repositoriesService.getRepositories(this.userName, this.repositoriesPerPage, this.currentPage);
      }))
      .subscribe(res => {
        this.repositories = res.body;
        this.noRepos = (this.repositories || []).length === 0
        const link = this.getLinkFromResponseHeaders(res);
        this.setPaginationPages(link);
      }, () => this.router.navigate(['/no-user']));
  }

  getNextRepository(pageUrl: string, isNext: boolean) {
    this.repositoriesService.getRepositories(null, null, null, pageUrl)
      .subscribe(res => {
        this.repositories = res.body;
        this.setPagitationUrls(this.getLinkFromResponseHeaders(res));
        this.setCurrentPage(isNext);
      });
  }

  goToRepositoryInfo(repository: string): void {
    this.router.navigate(['/repository-details'], { queryParams: { repository, userName: this.userName } });
  }

  setPaginationPages(link: string | null): void {
    if (link !== null) {
      this.nextApiPage = LinkHeaderHelper.getNextPageNumber(link);
      this.prevApiPage = LinkHeaderHelper.getPrevPageNumber(link);
      this.apiPages = LinkHeaderHelper.getPagesCount(link);
      this.setPagitationUrls(link);
    }
  }

  private setPagitationUrls(link: string | null) {
    if (!link) {
      return
    }

    this.nextPageUrl = LinkHeaderHelper.getNextPageUrl(link);
    this.previousPageUrl = LinkHeaderHelper.getPreviousPageUrl(link);
  }

  private setCurrentPage(isNext: boolean) {
    this.currentPage = isNext ? this.currentPage += 1 : this.currentPage -= 1;
  }

  private getLinkFromResponseHeaders(response: HttpResponse<Repository[]>): string | null {
    return response.headers.get('link');
  }

  nextPage(): void {
    if (this.currentPage === this.apiPages) {
      return;
    }

    this.getNextRepository(this.nextPageUrl, true);
  }

  previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }

    this.getNextRepository(this.previousPageUrl, false);
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
