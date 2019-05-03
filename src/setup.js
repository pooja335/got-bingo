import { database } from './firebaseConfig'

const baseCharacters = [
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

const optionalCharacters = [
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

const createCharacterStructure = () => {
  let baseCharacterObject = baseCharacters.reduce((acc, character) => {
    acc[character] = {
      alive: true,
      required: true
    }
    return acc
  }, {})

  return optionalCharacters.reduce((acc, character) => {
    acc[character] = {
      alive: true,
      required: false
    }
    return acc
  }, baseCharacterObject)
}

// TODO: change this to set instead of update once other code is done
const seedCharacters = () => {
  database.ref().update({ allCharacters: createCharacterStructure() })
}

seedCharacters()
