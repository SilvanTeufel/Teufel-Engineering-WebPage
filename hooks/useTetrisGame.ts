import { useState, useEffect, useCallback, useRef } from 'react';
import type { Player, Stage, TetrominoShape, StageCell } from '../types';
import { createStage, randomTetromino, STAGE_WIDTH } from '../constants';

export const useTetrisGame = () => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  });
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const playerRef = useRef(player);
  playerRef.current = player;

  const stageRef = useRef(stage);
  stageRef.current = stage;

  const resetPlayer = useCallback(() => {
    const newTetromino = randomTetromino();
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: newTetromino.shape,
      collided: false,
    });
  }, []);

  const checkCollision = useCallback((playerToCheck: Player, newStage: Stage, { x: moveX, y: moveY }: { x: number, y: number }): boolean => {
    for (let y = 0; y < playerToCheck.tetromino.length; y += 1) {
      for (let x = 0; x < playerToCheck.tetromino[y].length; x += 1) {
        if (playerToCheck.tetromino[y][x] !== 0) {
          if (
            !newStage[y + playerToCheck.pos.y + moveY] ||
            !newStage[y + playerToCheck.pos.y + moveY][x + playerToCheck.pos.x + moveX] ||
            newStage[y + playerToCheck.pos.y + moveY][x + playerToCheck.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  useEffect(() => {
    setStage(prev => {
      const newStage: Stage = prev.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              player.collided ? 'merged' : 'clear',
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        
        const stageWithClearedRows = newStage.reduce((acc, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            acc.unshift(Array.from(Array(newStage[0].length), (): StageCell => [0, 'clear']));
            return acc;
          }
          acc.push(row);
          return acc;
        }, [] as Stage);
        
        const rowsCleared = newStage.length - stageWithClearedRows.length;
        if(rowsCleared > 0) {
            setScore(prev => prev + rowsCleared * 10);
            setRows(prev => prev + rowsCleared);
        }

        return stageWithClearedRows;
      }
      return newStage;
    });
  }, [player, resetPlayer]);

  const movePlayer = useCallback((dir: number) => {
    if (!checkCollision(playerRef.current, stageRef.current, { x: dir, y: 0 })) {
      setPlayer(prev => ({ ...prev, pos: { x: prev.pos.x + dir, y: prev.pos.y } }));
    }
  }, [checkCollision]);
  
  const rotate = useCallback((matrix: TetrominoShape, dir: number) => {
      const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
      if(dir > 0) return rotatedTetro.map(row => row.reverse());
      return rotatedTetro.reverse();
  }, []);

  const playerRotate = useCallback((newStage: Stage, dir: number) => {
      const clonedPlayer = JSON.parse(JSON.stringify(playerRef.current));
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

      const pos = clonedPlayer.pos.x;
      let offset = 1;
      while(checkCollision(clonedPlayer, newStage, {x: 0, y: 0})) {
          clonedPlayer.pos.x += offset;
          offset = -(offset + (offset > 0 ? 1 : -1));
          if(offset > clonedPlayer.tetromino[0].length) {
              rotate(clonedPlayer.tetromino, -dir);
              clonedPlayer.pos.x = pos;
              return;
          }
      }
      setPlayer(clonedPlayer);
  }, [checkCollision, rotate]);

  const drop = useCallback(() => {
    if (!checkCollision(playerRef.current, stageRef.current, { x: 0, y: 1 })) {
      setPlayer(prev => ({ ...prev, pos: { y: prev.pos.y + 1, x: prev.pos.x }, collided: false }));
    } else {
      if (playerRef.current.pos.y < 1) {
        setStage(createStage());
        setScore(0);
        setRows(0);
        setLevel(0);
      }
      setPlayer(prev => ({ ...prev, collided: true }));
    }
  }, [checkCollision]);

  const hardDrop = useCallback(() => {
      let tempPlayer = { ...playerRef.current };
      while(!checkCollision(tempPlayer, stageRef.current, { x: 0, y: 1 })) {
          tempPlayer.pos.y += 1;
      }
      setPlayer({...tempPlayer, collided: true});
  }, [checkCollision]);

  const dropPlayer = useCallback(() => {
    drop();
  }, [drop]);

  const move = useCallback(({ keyCode }: { keyCode: number }) => {
    if (!isPaused) {
      if (keyCode === 37) movePlayer(-1);
      else if (keyCode === 39) movePlayer(1);
      else if (keyCode === 40) dropPlayer();
      else if (keyCode === 38) playerRotate(stageRef.current, 1);
      else if (keyCode === 32) hardDrop();
    }
  }, [isPaused, movePlayer, dropPlayer, playerRotate, hardDrop]);

  useEffect(() => {
    if (isPaused) return;
    
    const gameInterval = setInterval(() => {
        drop();
    }, 1000 / (level + 1) + 200);

    return () => clearInterval(gameInterval);
  }, [level, isPaused, drop]);

  return { stage, move, isPaused, setIsPaused };
};