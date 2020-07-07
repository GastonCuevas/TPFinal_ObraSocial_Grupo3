import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  mensaje: string = "";

  constructor(private fb: FacebookService) {

    this.iniciarFb();

   }

  ngOnInit(): void {
  }

  public iniciarFb(){
    const initParams: InitParams = {
    appId: '304979350633498',
    autoLogAppEvents : true,
    xfbml : true,
    version : 'v7.0'
    };
    this.fb.init(initParams);
    console.log("facebook iniciado");
  };

  public postFb(){
    console.log("entro a post facebook");
    console.log(this.mensaje);
    var apiMethod: ApiMethod = "post";
    this.fb.api('/102153934907739/feed', apiMethod,
    {
    message: this.mensaje,
    access_token:"EAAEVYInbvBoBAJq8scHeZBS6pkBebw6jf7dUR7Y4lofCxQH8wSFzrZAUZBQC0TA8zlgGNYL9YdX9dfIjIuB4uqipQZBvmvP7feL71MZBk7lZBYVoIrcFh7RphQ322MOdpnnpvYT8kDYmcVCw2vDjcZAcqZAqokoLwjjZB1cc9Op8Mw2CeS7T9tQZBrdlqmQZBtZAseGZBTkrTul4EudZAlIHggmb2pfRN2BtzoJSMoOVvdWP8zCQZDZD"
  });

}}
