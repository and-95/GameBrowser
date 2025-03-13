export interface Level {
  backgroundImage: string; // Путь к картинке фона
  obstacles: { x: number; y: number; text: string }[]; // Препятствия
}