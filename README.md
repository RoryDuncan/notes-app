# notes-app


## Schemas

### Board

```
{
  id: <uuid>,
  title: <string>,
  notes: <List of NoteID's>
}
```

### Note

```
{
  id: <uuid>,
  isPublished: <bool>,
  content: <markdown string>,
  lastModified: <DateTime>,
  publishedDate: <DateTime>,
  title: <string>,
  canonicalURL: <string>,
}
```

## UI-Refactor roadmap:

- [ ] Update Editor component to save data. Only pass ID and initial content
- [ ] Create 'Board' Abstraction: 
  - `ID`, list of `note.ID`s, a `title`, and a `content` field.
- [ ] Re-Create sidebar with concept of boards.
- [ ] Update Router to handle boards concept
- [ ] Create actions: Maximize editor, view rendered, etc