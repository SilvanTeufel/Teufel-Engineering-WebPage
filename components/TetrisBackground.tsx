
import React, { useEffect, useRef } from 'react';
import { useTetrisGame } from '../hooks/useTetrisGame';
import { TETROMINOS, STAGE_WIDTH, STAGE_HEIGHT } from '../constants';
import type { Stage } from '../types';

interface CellProps {
  type: string | number;
}

const Cell: React.FC<CellProps> = React.memo(({ type }) => {
    const color = type === 0 ? 'transparent' : `rgba(${TETROMINOS[type as keyof typeof TETROMINOS].color}, 0.2)`;
    const borderColor = type === 0 ? 'rgba(255, 255, 255, 0.05)' : `rgba(${TETROMINOS[type as keyof typeof TETROMINOS].color}, 0.4)`;
    return (
        <div 
            className="w-full h-full" 
            style={{ backgroundColor: color, border: `1px solid ${borderColor}`, boxShadow: type !== 0 ? `inset 0 0 5px ${color}` : 'none' }}
        />
    );
});

const TetrisBackground: React.FC = () => {
  const { stage, move, isPaused, setIsPaused } = useTetrisGame();
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      move({ keyCode: event.keyCode });
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial play state
    setIsPaused(false);
    if(gameAreaRef.current) gameAreaRef.current.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [move, setIsPaused]);


  return (
    <div 
        ref={gameAreaRef}
        tabIndex={0}
        className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden"
    >
      <div 
          className="grid gap-px" 
          style={{
              gridTemplateRows: `repeat(${STAGE_HEIGHT}, calc(100vh / ${STAGE_HEIGHT}))`,
              gridTemplateColumns: `repeat(${STAGE_WIDTH}, calc(100vw / ${STAGE_WIDTH}))`,
              width: '100vw',
              height: '100vh',
          }}
      >
        {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
      </div>
    </div>
  );
};

export default TetrisBackground;
