import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesDatePreditionComponent } from './pages/sales-date-predition/sales-date-predition.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SalesDatePreditionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales_date_prediction';
}
