import React, { FC } from 'react'

export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label className='checkbox-label'>
      <input
        type='checkbox'
        name={ props.label }
        checked={ props.checked }
        onChange={ props.onChange }
        disabled={ props.disabled }
      />
      { props.label }
    </label>
  )
}

type CheckboxProps = {
  checked?: boolean,
  onChange?: any,
  label: string,
  key: string,
  disabled?: boolean
}
