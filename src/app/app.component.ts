import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { ObstacleComponent } from './components/obstacle/obstacle.component';
import { LEVELS } from './models/level/levels.const';


@Component({
  selector: 'app-root',
  imports: [PlayerComponent,ObstacleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(PlayerComponent) playerComponent!: PlayerComponent;

  levels = LEVELS; // Все уровни
  currentLevelIndex: number = 0; // Текущий уровень
  obstacles = this.levels[this.currentLevelIndex].obstacles; // Препятствия текущего уровня
  currentObstacleIndex: number = 0;
  displayText: string = '';
  showNextLevelArrow: boolean = false;

  ngAfterViewInit(): void {
    this.startLevel();
  }

  startLevel(): void {
    this.playerComponent.enterFromLeft(() => {
      console.log('Персонаж встал в изначальную позицию!');
      this.moveToFirstObstacle(); // Автоматическое движение к первому препятствию
    });
  }

  moveToFirstObstacle(): void {
    const firstObstacle = this.obstacles[0];
    if (firstObstacle) {
      this.playerComponent.moveTo(firstObstacle.x, () => {
        this.displayText = firstObstacle.text;
        this.activateNextObstacle(); // Активируем следующее препятствие
      });
    }
  }

  onObstacleClick(index: number): void {
    const obstacle = this.obstacles[index];
    if (obstacle) {
      this.playerComponent.moveTo(obstacle.x, () => {
        this.displayText = obstacle.text;
        if (index === this.currentObstacleIndex) {
          this.activateNextObstacle();
        }
      });
    }
  }

  activateNextObstacle(): void {
    if (this.currentObstacleIndex <= this.obstacles.length - 1) {
      this.currentObstacleIndex++;
    };
     if(this.currentObstacleIndex == this.obstacles.length){
      // Последнее препятствие выполнено
      this.showNextLevelArrow = true;
    }
  }

  onNextLevelClick(): void {
    this.playerComponent.moveOffScreen(() => {
      this.currentLevelIndex++; // Переходим на следующий уровень
      if (this.currentLevelIndex < this.levels.length) {
        this.resetLevel(); // Сбрасываем уровень
        this.startLevel(); // Запускаем новый уровень
      } else {
        alert('Вы прошли все уровни!');
      }
    });
  }

  resetLevel(): void {
    this.obstacles = this.levels[this.currentLevelIndex].obstacles;
    this.currentObstacleIndex = 0;
    this.displayText = '';
    this.showNextLevelArrow = false;
  }

  get backgroundImage(): string {
    return `url('${this.levels[this.currentLevelIndex].backgroundImage}')`;
  }
}



//   obstacles = [
//     { x: 200, y: 650, text: 'Добро пожаловать в офис "Невская ратуша". Здесь происходят великие дела и принимаются судьбоносные решения! Теперь ты часть нашей огромной семьи, чему мы очень рады. Давай я тебе все покажу!', isActive: true, isCompleted: false },
//     { x: 500, y: 650, text: 'Так выглядят наши рабочие места - это иновационное пространство со всем необходимым для плодотворной работы, общения с коллегами и решения поставленных задач! Ты можешь разнообразить свое рабочее место личными вещами, так ты подчеркнешь свою индивидуальность - возможно, кому-то из коллег приглянуться твои увлечения!', isActive: false, isCompleted: false },
//     { x: 800, y: 650, text: 'Этого презентабельного мужчину зовут Иван Пупкин - это директор нашей дирекции. Замечательный человек, в  меру строгий, рассудительный и увлеченный своим делом - запомни это имя! Со временем ты поймешь, что на таких людей можно не только положиться, но и нужно ровняться! Давай перейдем на другой этаж и продолжим нашу экскурсию!', isActive: false, isCompleted: false }
//   ];
//   currentObstacleIndex: number = 0;
//   displayText: string = '';
//   showNextLevelArrow: boolean = false;

//   ngAfterViewInit(): void {
//     this.playerComponent.enterFromLeft(() => {
//       console.log('Персонаж встал в изначальную позицию!');
//       this.moveToFirstObstacle(); // Автоматическое движение к первому препятствию
//     });
//   }

//   moveToFirstObstacle(): void {
//     const firstObstacle = this.obstacles[0];
//     if (firstObstacle) {
//       this.playerComponent.moveTo(firstObstacle.x, () => {
//         this.displayText = firstObstacle.text;
//         firstObstacle.isCompleted = true; // Отмечаем препятствие как пройденное
//         this.activateNextObstacle(); // Активируем следующее препятствие
//       });
//     }
//   }

//   onObstacleClick(index: number): void {
//     const obstacle = this.obstacles[index];
//     if (obstacle.isActive) {
//       this.playerComponent.moveTo(obstacle.x, () => {
//         this.displayText = obstacle.text;
//         obstacle.isCompleted = true; // Отмечаем препятствие как пройденное
//         if (index === this.currentObstacleIndex) {
//           this.activateNextObstacle();
//         }
//       });
//     }
//   }

//   activateNextObstacle(): void {
//     if (this.currentObstacleIndex < this.obstacles.length - 1) {
//       this.currentObstacleIndex++;
//       this.obstacles[this.currentObstacleIndex].isActive = true;
//     } else {
//       this.showNextLevelArrow = true;
//     }
//   }

//   onNextLevelClick(): void {
//     this.playerComponent.moveOffScreen(() => {
//       alert('Персонаж ушёл за экран! Переход на следующий уровень!');
//       // Логика для перехода на следующий уровень
//     });
//   }
// }