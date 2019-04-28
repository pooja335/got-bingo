import React, { Component, FormEvent } from 'react'
import { remove, shuffle } from 'lodash'
import { Board } from './Board'
import { Checkbox } from './Checkbox'
import { database } from './firebaseConfig'

export class CreateBoardForm extends Component<{ togglePage: any }, { chosenCharacters: string[], showBoard: boolean, board: string[], boardName: string, baseCharacters: string[], optionalCharacters: string[] }> {
  constructor(props) {
    super(props)
    this.state = {
      chosenCharacters: [] as string[],
      showBoard: false,
      board: [] as string[],
      boardName: '',
      baseCharacters: [] as string[],
      optionalCharacters: [] as string[]
    }

    this.getCharacters()
  }

  getCharacters = (): void => {
    database.ref('/characters').once('value').then(characters => {
      const baseCharacters: string[] = characters.val().filter(character => character.required).map(character => character.name)
      const optionalCharacters: string[] = characters.val().filter(character => !character.required).map(character => character.name)

      this.setState({ baseCharacters, optionalCharacters })
    })
  }

  handleCheckboxChange = (event: FormEvent): void => {
    let chosenCharacters = [...this.state.chosenCharacters]
    const target = event.target as HTMLInputElement

    if (target.checked) {
      chosenCharacters.push(target.name)
    } else {
      remove(chosenCharacters, (character: string): boolean => character === target.name)
    }

    this.setState({ chosenCharacters })
  }

  shuffleBoard = (): void => {
    const board: string[] = shuffle(this.state.baseCharacters.concat(this.state.chosenCharacters))
    this.setState({ showBoard: true, board })
  }

  handleNameChange = (event: FormEvent): void => {
    const target = event.target as HTMLInputElement
    this.setState({ boardName: target.value })
  }

  saveBoard = (): void => {
    const { boardName, board } = this.state
    const newBoardRef = database.ref('/boards').push()

    newBoardRef.set({
      name: boardName,
      board
    })

    this.props.togglePage()
  }

  render() {
    const buttonDisabled: boolean = this.state.chosenCharacters.length + this.state.baseCharacters.length !== 25

    return (
      <div className='create-board-form'>
        <div className='character-selection'>
          <div>
            <h2>Base characters:</h2>
            {this.state.baseCharacters.map((character: string): JSX.Element =>
              <Checkbox
                key={character}
                label={character}
                checked
                disabled
              />
            )}
          </div>
          <div>
            <h2>Select 5 additional characters:</h2>
            {this.state.optionalCharacters.map((character: string): JSX.Element =>
              <Checkbox
                key={character}
                label={character}
                onChange={this.handleCheckboxChange}
              />
            )}
            <button disabled={buttonDisabled} onClick={this.shuffleBoard}>Generate or shuffle your board</button>
          </div>
        </div>
        <div className='board-generation'>
          <div className='close-icon' onClick={this.props.togglePage}>&#10005;</div>
          {this.state.showBoard &&
            <>
              <Board board={this.state.board} />
              <div className='save-board'>
                <input
                  type='text'
                  name='boardName'
                  value={this.state.boardName}
                  placeholder='Enter your name'
                  onChange={this.handleNameChange}
                />
                <button onClick={this.saveBoard}>Save your board!</button>
              </div>
            </>
          }
        </div>
      </div>
    )
  }
}
