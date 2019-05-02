import React, { Component, FormEvent } from 'react'
import { remove, shuffle } from 'lodash'
import { Board } from './Board'
import { Checkbox } from './Checkbox'
import { database } from './firebaseConfig'

type PropsType = { togglePage: any }

type StateType = {
  chosenCharacterNames: string[],
  showBoard: boolean,
  board: string[],
  boardName: string,
  baseCharacterNames: string[],
  optionalCharacterNames: string[]
}

export class CreateBoardForm extends Component<PropsType, StateType> {
  constructor(props) {
    super(props)
    this.state = {
      chosenCharacterNames: [] as string[],
      showBoard: false,
      board: [] as string[],
      boardName: '',
      baseCharacterNames: [] as string[],
      optionalCharacterNames: [] as string[]
    }

    this.getCharacters()
  }

  getCharacters = (): void => {
    database.ref('/allCharacters').once('value').then(characters => {
      type characterNamesType = {
        baseCharacterNames: string[],
        optionalCharacterNames: string[]
      }

      const startingAcc: characterNamesType = {
        baseCharacterNames: [],
        optionalCharacterNames: []
      }

      const characterNames: characterNamesType = Object.keys(characters.val()).reduce((acc, characterName) => {
        if (characters.val()[characterName].required) {
          acc.baseCharacterNames.push(characterName)
        } else {
          acc.optionalCharacterNames.push(characterName)
        }
        return acc
      }, startingAcc)

      this.setState({
        baseCharacterNames: characterNames.baseCharacterNames,
        optionalCharacterNames: characterNames.optionalCharacterNames
      })
    })
  }

  handleCheckboxChange = (event: FormEvent): void => {
    let chosenCharacterNames = [...this.state.chosenCharacterNames]
    const target = event.target as HTMLInputElement

    if (target.checked) {
      chosenCharacterNames.push(target.name)
    } else {
      remove(chosenCharacterNames, (character: string): boolean => character === target.name)
    }

    this.setState({ chosenCharacterNames })
  }

  shuffleBoard = (): void => {
    const board: string[] = shuffle(this.state.baseCharacterNames.concat(this.state.chosenCharacterNames))
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
    const buttonDisabled: boolean = this.state.chosenCharacterNames.length + this.state.baseCharacterNames.length !== 25

    return (
      <div className='create-board-form'>
        <div className='character-selection'>
          <div>
            <h2>Base characters:</h2>
            {this.state.baseCharacterNames.map((character: string): JSX.Element =>
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
            {this.state.optionalCharacterNames.map((character: string): JSX.Element =>
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
