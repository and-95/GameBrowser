import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-obstacle',
  imports: [CommonModule],
  templateUrl: './obstacle.component.html',
  styleUrl: './obstacle.component.scss'
})
export class ObstacleComponent {
  @Input() x: number = 0; // Позиция по X
  @Input() y: number = 0; // Позиция по Y
  @Input() text: string = ''; // Текст для отображения
  @Input() isActive: boolean = false; // Активно ли препятствие
  @Input() isCompleted: boolean = false; // Пройдено ли препятствие
  @Output() clicked = new EventEmitter<void>(); // Событие при клике

  isHovered: boolean = false; // Подсветка при наведении

  // Геттер для вычисления классов
  get obstacleClasses(): { [key: string]: boolean } {
    return {
      active: this.isActive,
      hovered: this.isHovered,
      completed: this.isCompleted
    };
  }

  onClick(): void {
    if (this.isActive || this.isCompleted) {
      this.clicked.emit();
    }
  }
}