import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor (
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}
  saveData() {
    this.dataStorage.storeRecipes().subscribe(
      (response: Response) => console.log(response)
    );
  }

  fetchData() {
    this.dataStorage.getRecipes();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
