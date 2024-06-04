import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormLabel from '@mui/material/FormLabel'
import Switch from '@mui/material/Switch'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { productCategory } from '../../client'
import { useForm, Controller } from 'react-hook-form'

const UserAccountForm = () => {
  const { control, handleSubmit, setValue } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col mx-auto py-12 gap-6"
    >
      <FormControl>
        <Controller
          name="profile_picture"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <input {...field} type={'file'} accept={'image/*'}></input>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <Controller
          name="full_name"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextField
                {...field}
                label={'Full name'}
                variant={'standard'}
              ></TextField>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <Controller
          name="emailAddress"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextField
                {...field}
                label={'Email'}
                variant={'standard'}
              ></TextField>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Created at</FormLabel>
        <Controller
          name="createdAt"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <DatePicker {...field}></DatePicker>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Notifications</FormLabel>
        <Controller
          name="notifications"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Switch {...field}></Switch>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Rating</FormLabel>
        <Controller
          name="rating"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Rating {...field}></Rating>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Select {...field}>
                {Object.values(productCategory).map((enumValue) => (
                  <MenuItem key={enumValue} value={enumValue}>
                    {enumValue}
                  </MenuItem>
                ))}
              </Select>

              {fieldState.invalid && (
                <span className="error-message">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  )
}

export default UserAccountForm
