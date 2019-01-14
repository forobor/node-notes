const fs = require('fs');
const _ = require('lodash');

const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

const saveNotes = notes => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body
    };

    notes.push(note);

    // or notes.filter((note) => note.title !== title))
    const uniqNotes = _.uniqBy(notes, 'title');

    saveNotes(uniqNotes);

    return _.find(uniqNotes, note);
};

const getAll = () => {
    return fetchNotes();
};

const getNote = title => {
    const notes = fetchNotes();
    const note = _.find(notes, { title });
    return note;
};

const deleteNote = title => {
    const notes = fetchNotes();
    const deletedNote = _.find(notes, { title });
    if (deletedNote) {
        _.remove(notes, deletedNote);
    }
    saveNotes(notes);
    return deletedNote;
};

showNoteInfo = note =>
    console.log(
        note
            ? `Note is ${note.title} ${note.body}`
            : 'Wrong title'
    );

module.exports = {
    addNote,
    getAll,
    getNote,
    deleteNote,
    showNoteInfo
};
