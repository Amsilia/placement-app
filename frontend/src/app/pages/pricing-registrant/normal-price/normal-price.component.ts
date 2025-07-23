import { Component } from '@angular/core';
import { NavbarUsersComponent } from "../../../components/users/navbar/navbar.component-users";
import { NormalRegisrantComponent } from "../../../components/users/normal-regisrant/normal-regisrant.component";

@Component({
  selector: 'app-normal-price',
  standalone: true,
  imports: [NavbarUsersComponent, NormalRegisrantComponent],
  templateUrl: './normal-price.component.html',
  styleUrl: './normal-price.component.scss'
})
export class NormalPriceComponent {

}
