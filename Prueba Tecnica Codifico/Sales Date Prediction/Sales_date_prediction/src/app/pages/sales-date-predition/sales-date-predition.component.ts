import { Component } from '@angular/core';
import { TableSalesDatePredictionComponent } from './Components/table-sales-date-prediction/table-sales-date-prediction.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-sales-date-predition',
  imports: [
    TableSalesDatePredictionComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './sales-date-predition.component.html',
  styleUrl: './sales-date-predition.component.css'
})
export class SalesDatePreditionComponent {

}
