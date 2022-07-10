

export class RepoDetail {
  language!: string;
  percent!: number;
  percentStyle: any;

  constructor(language: string, percent: number, randomColor: string | undefined) {
      this.language = language;
      this.percent = percent;
      this.percentStyle = {
        'background-color': randomColor,
        'width': percent*2 + 'px',
      }
    }
}
