# notes-app


## Notes Schema

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

- [ ] Update Editor component to save data. Only pass ID and intial content
- [ ] Create 'Board' Abstraction: 
  - `ID`, list of `note.ID`s, a `title`, and a `content` field.
- [ ] Re-Create sidebar with concept of boards.
- [ ] Update Router to handle boards concept
- [ ] Create actions: Maximize editor, view rendered, etc