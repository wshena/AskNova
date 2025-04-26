import React, { useState } from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Controller, FieldValues, Path, Control } from 'react-hook-form'
import { Input } from './ui/input'
import { CloseEyeIcon, OpenEyeIcon } from './icons/icons'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  label: string,
  placeholder?: string,
  type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({control, name, label, placeholder, type='text'}:FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className='w-full'>
          <FormLabel className='label'>{label}</FormLabel>
          <FormControl>
            <div className='relative w-full'>
              <Input
                required
                autoComplete='off'
                className='input w-full pr-10'
                type={inputType}
                placeholder={placeholder}
                {...field}
              />
              {type === 'password' && (
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute inset-y-0 right-2 flex items-center justify-center p-1 cursor-pointer'
                >
                  {showPassword ? <CloseEyeIcon color='black' size={20} /> : <OpenEyeIcon color='black' size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />  
  )
}

export default FormField