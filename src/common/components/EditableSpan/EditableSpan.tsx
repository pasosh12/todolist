import { useState } from "react"

type PropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ title, onChangeTitle, disabled }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const turnOnEditMode = () => {
    if (disabled) return
    setIsEditing(true)
    onChangeTitle(newTitle)
  }
  const turnOffEditMode = () => {
    setIsEditing(false)
  }
  return isEditing ? (
    <input value={newTitle} autoFocus onChange={(e) => setNewTitle(e.currentTarget.value)} onBlur={turnOffEditMode} />
  ) : (
    <span onDoubleClick={turnOnEditMode}>{title}</span>
  )
}
