import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.css']
})
export class Loader implements OnInit {
  
  loading$!: Observable<boolean>;
  
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$; // Subscribe to loading state
  }
}