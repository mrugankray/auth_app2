import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(
    private flashmessages: FlashMessagesService,
    private router: Router,
    private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
