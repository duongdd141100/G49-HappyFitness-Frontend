import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { AuthService } from 'src/app/services/services/auth.service';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  // imports: [CommonModule]
})

export class IntroductionComponent implements OnInit {
  focus: any;
  focus1: any;
  me: any;
  value = '';

  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.onLoadMe();
    this.value = 'default'
  }
  onLoadMe() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        this.me = res.body
      }, // nextHandler
      error: (err) => {
      
        return
      }, // errorHandler
    })
  }

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }
}
