import React, { FC } from 'react'

export const Board: FC<{ board: string[], small?: boolean }> = ({ board, small }) => {
  return (
    <div className={small ? 'small board' : 'board'}>
      {board.map((character: string, index: number): JSX.Element =>
        <div className='board-square' key={index}>{character}</div>
      )}
    </div>
  )
}

