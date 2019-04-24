import React, { Component } from 'react'
import { Checkbox } from './Checkbox'

export class CreateBoardForm extends Component<{}, { chosenCharacters: string[] }> {
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
    chosenCharacters: ["test"]
  }


  render() {
    return (
      <div>
        {this.baseCharacters.map((character, index) =>
          <Checkbox
            key={index}
            label={character}
            checked
            disabled
            onChange={() => console.log('hello')}
          />
        )}
      </div>
    )
  }
}
