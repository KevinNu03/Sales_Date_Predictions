import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { SalesDatePredictionServiceService } from '../../Services/sales-date-prediction-service.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { Customers } from '../../../../shared/models/Customers';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { tap } from 'rxjs';
import { LoadingTableComponent } from '../../../../shared/components/ui/loanding/loading-table/loading-table.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalOrdersViewComponent } from '../modal-orders-view/modal-orders-view.component';
import { ModalNewOrderComponent } from '../modal-new-order/modal-new-order.component';

@Component({
  selector: 'app-table-sales-date-prediction',
  standalone: true,
  templateUrl: './table-sales-date-prediction.component.html',
  styleUrl: './table-sales-date-prediction.component.css',
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatToolbarModule,
    LoadingTableComponent,
    MatDialogModule
  ],
})
export class TableSalesDatePredictionComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesDateService: SalesDatePredictionServiceService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['customername', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
  dataSource!: MatTableDataSource<Customers>;
  pageIndex?: number;
  filtro?: string;
  listCustomers: Customers[] = [];
  loaderTable: boolean = false;

  ngOnInit() {
    const paginacion = this.localStorageService.getIndexPage();
    this.loaderTable = false;

    this.salesDateService.GetCustomersOrdersDate()
      .pipe(
        tap(responseCustomers => {
          this.paginator._intl.itemsPerPageLabel = 'Tamaño de Página';
          this.pageIndex = paginacion ? parseInt(paginacion) : 0;

          this.listCustomers = responseCustomers;
          this.dataSource = new MatTableDataSource(responseCustomers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.pageIndex = this.pageIndex;
          this.dataSource.sort = this.sort;
          this.loaderTable = true;
        })
      )
      .subscribe({
        next: () => {},
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex  = e.pageIndex;
    this.localStorageService.saveIndexPage(this.pageIndex.toString());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openOrdersModal(customerId: number, customerName: string) {
    this.dialog.open(ModalOrdersViewComponent, {
      width: 'auto',
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '80vh', 
      data: { cusId: customerId, CustomerName: customerName }
    });
  }

  openAddOrder(CustomerId: number, customerName: string){
    this.dialog.open(ModalNewOrderComponent, {
      width: 'auto',
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '80vh', 
      data: { cusId: CustomerId, CustomerName: customerName }
    });
  }
}
