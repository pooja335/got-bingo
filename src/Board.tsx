import React, { Component } from 'react'
import { database } from './firebaseConfig'

export class Board extends Component<{ board: string[], small?: boolean }, { characterInfo: any }> {
  constructor(props) {
    super(props)

    this.state = {
      characterInfo: {}
    }

    this.getCharacterInfo()
  }

  getCharacterInfo = () => {
    database.ref('/allCharacters').once('value').then(characters => this.setState({ characterInfo: characters.val() }))
  }

  render() {
    return (
      <div className={this.props.small ? 'small board' : 'board'}>
        {this.props.board.map((character: string): JSX.Element =>
          <div
            className={this.state.characterInfo[character] && !this.state.characterInfo[character].alive ? 'board-square dead' : 'board-square'}
            key={character}>
            {character}
          </div>
        )}
      </div>
    )
  }
}

