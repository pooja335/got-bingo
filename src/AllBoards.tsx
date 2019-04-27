import React, { FC } from 'react'
import { Board } from './Board'

export const AllBoards: FC<{ togglePage: any }> = ({ togglePage }) => {
  const boards = [{
    name: 'Ben',
    board: ["Arya Stark", "Sansa Stark", "Bran Stark", "Jon Snow", "Theon Greyjoy", "Yara Greyjoy", "Euron Greyjoy", "Cersei Lannister", "Jaime Lannister", "Tyrion Lannister", "Sam Tarly", "Tormund Giantsbane", "Brienne of Tarth", "Gendry", "Podrick", "Danaerys Targaryen", "Jorah Mormont", "Davos Seaworth", "Lyanna Mormont", "The Night King", "Lord Varys", "Missandei", "Grey Worm", "The Hound", "Beric Dondarrion"]
  },
  {
    name: 'Pooja',
    board: ["Jon Snow", "Theon Greyjoy", "Yara Greyjoy", "Jorah Mormont", "Davos Seaworth", "Euron Greyjoy", "Gendry", "The Night King", "Arya Stark", "Bran Stark", "Jaime Lannister", "Tyrion Lannister", "Sam Tarly", "Tormund Giantsbane", "Brienne of Tarth", "Sansa Stark", "Lyanna Mormont", "Cersei Lannister", "Lord Varys", "Missandei", "Grey Worm", "Podrick", "Beric Dondarrion", "Danaerys Targaryen", "The Hound"]
  },
  {
    name: 'Seyi',
    board: ["Yara Greyjoy", "Bran Stark", "Arya Stark", "Sansa Stark", "Jon Snow", "Euron Greyjoy", "Tormund Giantsbane", "Jaime Lannister", "Grey Worm", "Cersei Lannister", "Tyrion Lannister", "Brienne of Tarth", "Gendry", "Podrick", "Sam Tarly", "Theon Greyjoy", "Jorah Mormont", "Davos Seaworth", "Lyanna Mormont", "Danaerys Targaryen", "The Hound", "Lord Varys", "Missandei", "Beric Dondarrion", "The Night King"]
  },
  {
    name: 'Ellen',
    board: ["Theon Greyjoy", "Tyrion Lannister", "Bran Stark", "Jon Snow", "Jorah Mormont", "Euron Greyjoy", "Tormund Giantsbane", "Arya Stark", "Cersei Lannister", "Jaime Lannister", "Brienne of Tarth", "Sam Tarly", "Podrick", "Yara Greyjoy", "Missandei", "Sansa Stark", "Lord Varys", "The Night King", "Lyanna Mormont", "The Hound", "Gendry", "Danaerys Targaryen", "Beric Dondarrion", "Grey Worm", "Davos Seaworth"]
  }]

  return (
    <div className='all-boards'>
      <div className='create-new'>
        <button onClick={togglePage}>Create New</button>
      </div>
      <h1 className='title'>All Boards</h1>
      <div className='board-grid'>
        {boards.map((boardObject: { name: string, board: string[] }): JSX.Element =>
          <div className='board-with-name'>
            <h2>{boardObject.name}</h2>
            <Board board={boardObject.board} small={true} />
          </div>
        )}
      </div>
    </div>
  )
}
