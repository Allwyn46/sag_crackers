import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero/hero';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, FontAwesomeModule, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  faWhatsapp = faWhatsapp;
  textColor = 'red';
  fontSize = 20;
}
