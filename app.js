const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

// yargs simplify work with inputs
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help().argv;

const command = argv._[0];
console.log('Your command is:', command);

if (command === 'add') {
    const addedNote = notes.addNote(argv.title, argv.body);
    notes.showNoteInfo(addedNote);
} else if (command === 'list') {
    const allNotes = notes.getAll();
    allNotes.map(note => showNoteInfo(note));
} else if (command === 'read') {
    const note = notes.getNote(argv.title);
    notes.showNoteInfo(note);
} else if (command === 'remove') {
    const deletedNote = notes.deleteNote(argv.title);
    notes.showNoteInfo(deletedNote);
} else {
    console.log('not recongnized');
}
