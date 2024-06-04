import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { productCategory } from '../../client'
import { useForm, Controller } from 'react-hook-form'

const orderItemForm = () => {
  const { control, handleSubmit, setValue } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="ProductName"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <TextField
              {...field}
              variant={'outlined'}
              fullWidth={true}
            ></TextField>

            {fieldState.invalid && (
              <span className="error-message">{fieldState.error?.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        name="quantity"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <TextField
              {...field}
              variant={'outlined'}
              fullWidth={true}
            ></TextField>

            {fieldState.invalid && (
              <span className="error-message">{fieldState.error?.message}</span>
            )}
          </div>
        )}
      />

      <Button type="submit" variant={'contained'} color={'primary'}>
        Submit
      </Button>
    </form>
  )
}

export default orderItemForm
