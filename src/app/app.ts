import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero/hero';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { NgStyle } from '@angular/common';
import { Prodtable } from './prodtable/prodtable';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, FontAwesomeModule, NgStyle, Prodtable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  faWhatsapp = faWhatsapp;
  phoneIcon = faPhone;
  textColor = 'red';
  fontSize = 20;
}
