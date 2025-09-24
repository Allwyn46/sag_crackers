import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgStyle],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  textColor = 'red';
}
