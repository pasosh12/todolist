import { SxProps } from "@mui/material"

export const containerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
}

export const getListItemsSx = (isDone: Boolean): SxProps => ({
  display: "flex",
  opacity: isDone ? "0.5" : "1",
})
