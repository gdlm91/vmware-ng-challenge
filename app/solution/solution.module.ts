import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SolutionComponent } from './solution.component';
import { FaasCostComponent } from './faasCost.component';
import { CurrencySelectorComponent } from './currencySelector.component';
import { FaasCostService } from './faasCost.service';
import { ExchangeRatesService } from './exchangeRates.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
   imports: [SharedModule, HttpModule, FormsModule],
   declarations: [SolutionComponent, FaasCostComponent, CurrencySelectorComponent],
   exports: [SolutionComponent],
   providers: [FaasCostService, ExchangeRatesService],
})
export class SolutionModule { }
