import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { BookingIResponse } from 'src/app/models/booking.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-user',
  templateUrl: './booking-user.component.html',
  styleUrls: ['./booking-user.component.scss']
})
export class BookingUserComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nro', 'admission','departure', 'status'];
  dataSource: MatTableDataSource<BookingIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription  
  subscription2$: Subscription

  bookings: BookingIResponse[]
  status: string
  name: string
  statusList: string[]
  selectedStatus: string
  sub: string

  form: FormGroup

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.statusList = ['', 'Pendiente', 'En curso', 'Finalizada', 'Cancelada']
    this.form = this.initForm()
    const token = localStorage.getItem('token')
    const { sub } = this.sharedService.getDecodedAccessToken(token)
    this.sub = sub
  }

  initForm(): FormGroup {
    return this.fb.group({
      'status': ['', []]
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.bookingService.getAllByUser(this.sub).subscribe(res => {
      this.dataSource = new MatTableDataSource<BookingIResponse>(res);
      this.bookings = res

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }

  filterByStatus() {
    if(!this.form.controls['status'].value) {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings)
    } else {
      this.dataSource = new MatTableDataSource<BookingIResponse>(this.bookings.filter(x => x.status == this.form.controls['status'].value))
    }

    this.dataSource.paginator = this.paginator
  }
}