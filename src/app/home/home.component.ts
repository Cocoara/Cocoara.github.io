import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../models/portfolio';
import { FirebasedbService } from '../services/firebasedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public portfolios: Portfolio[] = [];
  public portfolio: Portfolio;
  public mode: string;

  constructor(private firebd: FirebasedbService) {
    this.portfolio = new Portfolio();
    this.mode = "add";

    this.firebd.getPortfolio().subscribe(
      (originalPortfolios: Portfolio[]) => {
        this.portfolios = originalPortfolios;
        console.log(this.portfolios);
      }
    );
  }

  addPortfolio() {
    this.firebd.addPortfolio(this.portfolio);
  }

  deletePortfolio(i: number) {
    this.firebd.deletePortfolio(this.portfolios[i].id);
  }

  loadCurrentPortfolio(i: number) {
    this.mode = "update"
    this.portfolio = this.portfolios[i];
  }

  updatePortfolio() {
    this.firebd.updatePortfolio(this.portfolio.id, this.portfolio);
  }

  
  ngOnInit(): void {
  }

}