import React, { Component } from 'react'
import { Board } from './Board'
import { database } from './firebaseConfig'

type boardObjectType = {
  name: string,
  board: string[]
}

export class AllBoards extends Component<{ togglePage: any }, { allBoards: boardObjectType[] }> {
  constructor(props) {
    super(props)

    this.state = {
      allBoards: [] as boardObjectType[]
    }

    this.getAllBoards()
  }

  getAllBoards = (): void => {
    database.ref('/boards').once('value').then(boards => {
      if (boards.val()) {
        this.setState({ allBoards: Object.values(boards.val()) })
      }
    })
  }

  render() {
    return (
      <div className='all-boards'>
        <div className='create-new'>
          <button onClick={this.props.togglePage}>Create New</button>
        </div>
        <h1 className='title'>All Boards</h1>
        <div className='board-grid'>
          {this.state.allBoards.map((boardObject: boardObjectType): JSX.Element =>
            <div className='board-with-name' key={boardObject.name}>
              <h2>{boardObject.name}</h2>
              <Board board={boardObject.board} small={true} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
