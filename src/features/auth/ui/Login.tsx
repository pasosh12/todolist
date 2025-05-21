import { selectTheme } from "@/app/app-Slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { type LoginInputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { loginTC, refreshCaptcha, selectCaptcha } from "@/features/auth/model/auth.slice.ts"
import RefreshIcon from "@mui/icons-material/Refresh"

export const Login = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectTheme)
  const captchaSrc = useAppSelector(selectCaptcha)
  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(loginTC(data))
    if (captchaSrc === "") {
      reset()
    }
  }
  const refreshCaptchaHandler = () => {
    dispatch(refreshCaptcha())
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.email}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label={"Remember me"}
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            {/*<FormControlLabel label={"captcha"} />*/}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            {captchaSrc && (
              <>
                <img src={captchaSrc} alt={"captcha"} style={{ margin: "10px 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <TextField
                    label={"Enter captcha"}
                    margin={"normal"}
                    type="text"
                    error={!!errors.captcha}
                    {...register("captcha")}
                  />
                  {errors.captcha && <span className={styles.errorMessage}>{errors.captcha.message}</span>}
                  <RefreshIcon onClick={refreshCaptchaHandler} />
                </div>
              </>
            )}
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
