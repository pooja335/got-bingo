import React, { Component, FormEvent } from 'react'
import { remove, shuffle } from 'lodash'
import { Checkbox } from './Checkbox'

export class CreateBoardForm extends Component<{}, { chosenCharacters: string[], showBoard: boolean }> {
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
  ]

  state = {
    chosenCharacters: [...this.baseCharacters],
    showBoard: false
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
    const newOrder: string[] = shuffle(this.state.chosenCharacters)
    this.setState({ showBoard: true, chosenCharacters: newOrder })
  }

  render() {
    const buttonDisabled: boolean = this.state.chosenCharacters.length !== 25

    return (
      <div style={{display: 'flex'}}>
        <div>
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
          {this.optionalCharacters.map((character: string, index: number): JSX.Element =>
            <Checkbox
              key={30 + index}
              label={character}
              onChange={this.handleCheckboxChange}
            />
          )}
        </div>
        <button disabled={buttonDisabled} onClick={this.shuffleBoard}>Generate a new board</button>
        {this.state.showBoard &&
          <div className='board'>
            {this.state.chosenCharacters.map((character: string, index: number): JSX.Element =>
              <div className='board-square' key={index}>{character}</div>
            )}
          </div>
        }
      </div>
    )
  }
}
