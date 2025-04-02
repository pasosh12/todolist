import { useState } from "react"

type PropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, onChangeTitle }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  return isEditing ? (
    <input
      value={newTitle}
      autoFocus
      onChange={(e) => setNewTitle(e.currentTarget.value)}
      onBlur={() => {
        setIsEditing(false)
        onChangeTitle(newTitle)
      }}
    />
  ) : (
    <span onDoubleClick={() => setIsEditing(true)}>{title}</span>
  )
}
