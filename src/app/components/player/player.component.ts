import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  x: number = 0 - 250; // Начальная позиция по X
  y: number = 720 - 435; // Начальная позиция по Y (нижний край)
  speed: number = 5; // Скорость перемещения
  isFacingRight: boolean = true; // Направление персонажа
  isMoving: boolean = false; // Флаг, указывающий, движется ли персонаж

  ngOnInit(): void {
    this.updatePosition();
  }

  enterFromLeft(onComplete: () => void): void {
    this.x = 0 - 250;
    if (this.isMoving) {
      return; // Если персонаж уже движется, игнорируем новый вызов
    }

    this.isMoving = true; // Устанавливаем флаг движения

    // Плавное перемещение из-за экрана слева
    const targetX = 0; // Изначальная позиция по X
    const interval = setInterval(() => {
      const delta = targetX - this.x;
      if (Math.abs(delta) < this.speed) {
        this.x = targetX;
        this.updatePosition();
        clearInterval(interval);
        this.isMoving = false; // Сбрасываем флаг движения
        onComplete(); // Вызываем колбэк после завершения движения
      } else {
        this.x += this.speed; // Движение вправо
        this.updatePosition();
      }
    }, 16); // ~60 FPS
  }

  moveTo(newX: number, onComplete: () => void): void {
    if (this.isMoving) {
      return; // Если персонаж уже движется, игнорируем новый вызов
    }

    this.isMoving = true; // Устанавливаем флаг движения

    // Определяем направление движения
    if (newX > this.x && !this.isFacingRight) {
      this.isFacingRight = true;
      this.updatePosition();
    } else if (newX < this.x && this.isFacingRight) {
      this.isFacingRight = false;
      this.updatePosition();
    }

    // Плавное перемещение
    const interval = setInterval(() => {
      const delta = newX - this.x;
      if (Math.abs(delta) < this.speed) {
        this.x = newX;
        this.updatePosition();
        clearInterval(interval);
        this.isMoving = false; // Сбрасываем флаг движения
        onComplete(); // Вызываем колбэк после завершения движения
      } else {
        this.x += delta > 0 ? this.speed : -this.speed;
        this.updatePosition();
      }
    }, 16); // ~60 FPS
  }

  moveOffScreen(onComplete: () => void): void {
    if (this.isMoving) {
      return; // Если персонаж уже движется, игнорируем новый вызов
    }

    this.isMoving = true; // Устанавливаем флаг движения

    // Плавное перемещение за экран
    const targetX = 1280 + 150; // За пределами экрана справа
    const interval = setInterval(() => {
      const delta = targetX - this.x;
      if (Math.abs(delta) < this.speed) {
        this.x = targetX;
        this.updatePosition();
        clearInterval(interval);
        this.isMoving = false; // Сбрасываем флаг движения
        onComplete(); // Вызываем колбэк после завершения движения
      } else {
        this.x += this.speed;
        this.updatePosition();
      }
    }, 16); // ~60 FPS
  }

  updatePosition(): void {
    const playerElement = document.querySelector('.player') as HTMLElement;
    if (playerElement) {
      playerElement.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${
        this.isFacingRight ? 1 : -1
      })`;
    }
  }
}