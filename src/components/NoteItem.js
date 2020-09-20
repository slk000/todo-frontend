import React from 'react'

const NoteItem = ({ note, onChangeImportance, onDelete }) => {
  const importantClass = note.important?'note-important':''
  return <section className="note center">
    <header className={importantClass}>
      Note #{note.id}
      <div className="note-btn">
        <a onClick={onChangeImportance} href="#" title="更改重要性">🚨</a>
        <a onClick={onDelete} href="#" title="删除">❌</a>
      </div>
    </header>
    <main>
      <p>{note.content}</p>
    </main>
    <footer><span>{note.date.substr(0, 19)}</span></footer>
  </section>
}

export default NoteItem