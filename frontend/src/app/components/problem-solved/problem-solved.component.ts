import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Opportunity {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-problem-solved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem-solved.component.html',
  styleUrls: ['./problem-solved.component.scss']
})
export class ProblemSolvedComponent {
  challenges = [
    'Manufacture',
    'IT',                                                                                                                                                                                                                                                                                                                                                                                                                       
    'Farming'
  ];

}