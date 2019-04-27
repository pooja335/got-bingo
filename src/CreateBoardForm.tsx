import React, { Component, FormEvent } from 'react'
import { remove, shuffle } from 'lodash'
import { Checkbox } from './Checkbox'

export class CreateBoardForm extends Component<{}, { chosenCharacters: string[], showBoard: boolean, board: string[] }> {
  baseCharacters: string[] = [
    "Arya Stark",
    "Sansa Stark",
    "Bran Stark",
    "Jon Snow",
    "Theon Greyjoy",
    "Yara Greyjoy",
    "Euron Greyjoy",
    "Cersei Lannister",
    "Jaime Lannister",
    "Tyrion Lannister",
    "Sam Tarly",
    "Tormund Giantsbane",
    "Brienne of Tarth",
    "Gendry",
    "Podrick",
    "Danaerys Targaryen",
    "Jorah Mormont",
    "Davos Seaworth",
    "Lyanna Mormont",
    "The Night King"
  ]

  optionalCharacters: string[] = [
    "Lord Varys",
    "Missandei",
    "Grey Worm",
    "The Hound",
    "Beric Dondarrion",
    "Bronn",
    "Melisandre",
    "Edd Tollett",
    "Gilly",
    "Little Sam",
    "Drogon",
    "Rhaegal"
  ]

  state = {
    chosenCharacters: [] as string[],
    showBoard: false,
    board: [] as string[]
  }

  handleCheckboxChange = (event: FormEvent): void => {
    let { chosenCharacters } = this.state
    const target = event.target as HTMLInputElement

    if (target.checked) {
      chosenCharacters.push(target.name)
    } else {
      remove(chosenCharacters, (character: string): boolean => character === target.name)
    }

    this.setState({ chosenCharacters })
  }

  shuffleBoard = (): void => {
    const board: string[] = shuffle(this.baseCharacters.concat(this.state.chosenCharacters))
    this.setState({ showBoard: true, board })
  }

  render() {
    const buttonDisabled: boolean = this.state.chosenCharacters.length + this.baseCharacters.length !== 25

    return (
      <div className='create-board-form'>
        <div className='character-selection'>
          <div className='names'>
            <div>
              <h1>Base Characters:</h1>
              {this.baseCharacters.map((character: string, index: number): JSX.Element =>
                <Checkbox
                  key={index}
                  label={character}
                  checked
                  disabled
                />
              )}
            </div>
            <div>
              <h1>Select 5 additional characters:</h1>
              {this.optionalCharacters.map((character: string, index: number): JSX.Element =>
                <Checkbox
                  key={30 + index}
                  label={character}
                  onChange={this.handleCheckboxChange}
                />
              )}
            </div>
          </div>
          <button disabled={buttonDisabled} onClick={this.shuffleBoard}>Generate a new board</button>
        </div>
        <div className='board-generation'>
          {this.state.showBoard &&
            <div className='board'>
              {this.state.board.map((character: string, index: number): JSX.Element =>
                <div className='board-square' key={index}>{character}</div>
              )}
            </div>
          }
        </div>
      </div>
    )
  }
}
