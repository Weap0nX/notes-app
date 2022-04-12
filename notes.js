const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes(title)
    const requiredNote = notes.find((note) => note.title === title)
    if (requiredNote) {
        console.log(chalk.yellow(title))
        console.log(requiredNote.body)
    }
    else {
        console.log(chalk.red("Note not found!"))
    }
}

const listNotes = () => {
    console.log(chalk.yellow("Your notes: "))
    const notes = loadNotes()
    notes.forEach(note => console.log(note.title))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)
    if (notes.length === remainingNotes.length) {
        console.log(chalk.red.inverse("Note not found"))
    }
    else {
        console.log(chalk.green.inverse('Note Removed'))
    }
    saveNotes(JSON.stringify(remainingNotes))
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (duplicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(JSON.stringify(notes))
        console.log("Note added!")
    }
    else {
        console.log("Note title already exists!")
    }
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', notes)

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    }
    catch {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}