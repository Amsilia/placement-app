import { Component } from '@angular/core';
import { NavbarUsersComponent } from "../../../components/users/navbar/navbar.component-users";
import { SpecialRegisrantComponent } from "../../../components/users/special-regisrant/special-regisrant.component";

@Component({
  selector: 'app-special-price',
  standalone: true,
  imports: [
    NavbarUsersComponent,
    SpecialRegisrantComponent
],
  templateUrl: './special-price.component.html',
  styleUrl: './special-price.component.scss'
})
export class SpecialPriceComponent {

}
