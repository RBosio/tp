import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserIResponse } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['dni', 'name','surname', 'email', 'phone', 'roles'];
  dataSource: MatTableDataSource<UserIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription
  subscription2$: Subscription

  users: UserIResponse[]
  dni: string
  name: string

  constructor(
    private userService: UserService,
  ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.userService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<UserIResponse>(res);
      this.users = res

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
  
  filterByDniAndName() {
    if(!this.dni && !this.name) {
      this.dataSource = new MatTableDataSource<UserIResponse>(this.users)
    } else if(!this.dni) {
      this.dataSource = new MatTableDataSource<UserIResponse>(this.users.filter(x => x.name.toLowerCase().includes(this.name.toLowerCase())))
    } else if(!this.name) {
      this.dataSource = new MatTableDataSource<UserIResponse>(this.users.filter(x => x.dni.includes(this.dni)))
    } else {
      this.dataSource = new MatTableDataSource<UserIResponse>(this.users.filter(x => x.name.toLowerCase().includes(this.name.toLowerCase()) && x.dni.includes(this.dni)))
    }

    this.dataSource.paginator = this.paginator
  }
}