export interface Game {
  winner: string;
  status: GameStatus;
}

enum GameStatus {
  Playing = 'playing',
  Finished = 'finished',
  InProgress = 'progress',
}
