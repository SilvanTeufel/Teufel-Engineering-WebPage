export type TetrominoShape = (number | string)[][];

// A cell is a tuple: [value, state]
// value is 0 for empty, or a letter for a tetromino
// state is 'clear' for an empty or moving cell, 'merged' for a landed block
export type StageCell = [string | number, 'clear' | 'merged'];
export type Stage = StageCell[][];

export type Player = {
    pos: { x: number; y: number };
    tetromino: TetrominoShape;
    collided: boolean;
};