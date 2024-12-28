import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-ubicacion-legajo',
  templateUrl: './ubicacion-legajo.component.html',
  styleUrls: ['./ubicacion-legajo.component.css']
})
export class UbicacionLegajoComponent implements OnInit {
  legajoId: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.legajoId = params.get('id')!;
    });
  }
}
