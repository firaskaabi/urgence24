import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrepro',
  templateUrl: './registrepro.component.html',
  styleUrls: ['./registrepro.component.css']
})
export class RegistreproComponent implements OnInit {
  test : Date = new Date();
    focus;
    focus1;
    focus2;
  constructor() { }

  ngOnInit(): void {
  }

}
