import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { RepoDetail } from '../core/models/repo-detail.model';
import { RepositoriesService } from '../core/services/repositories.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent {

  private readonly colorArray = ['#69CFA7', '#7A32BA', '#BA527D', '#586CED', '#C279CB', '#984763', '#F4835F', '#73BEEB', '#9DD29C', '#FCD154'];
  repositoryName = '';
  userName = '';
  repoDetails: RepoDetail[] = [];
  displayRepo!: boolean;

  constructor(
    protected repositoriesService: RepositoriesService,
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRepositoryDetails();
  }

  backToListOfRepos() {
    this.router.navigate(['/repositories'], { queryParams: { userName: this.userName } });
  }

  getRepositoryDetails() {
    this.route.queryParams
      .pipe(mergeMap(params => {
        this.userName = params.userName;
        this.repositoryName = params.repository;

        return this.repositoriesService.getRepositoryDetails(this.userName, this.repositoryName);
      }))
      .subscribe(data => {
        if (Object.keys(data).length > 0) {
          this.createRepoDetails(data);
          this.displayRepo = true;
        } else
          this.displayRepo = false;
      });
  }

  createRepoDetails(usedLanguages: { [key: string]: number }) {
    const totalBytes = Object.values(usedLanguages).reduce((a, b) => { return a + b });

    Object.entries(usedLanguages).forEach(([key, value]) => {
      const percentage = value / totalBytes * 100;
      this.repoDetails.push(new RepoDetail(key, parseFloat(percentage.toFixed(1)), this.colorArray.pop()));
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
