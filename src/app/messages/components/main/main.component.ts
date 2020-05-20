import { Component, OnInit,DoCheck } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  public title;

  constructor() {
    this.title = 'Mensajes privados';
  }

  ngOnInit(): void {
  }

}
