import React, { FC } from 'react'

export const Checkbox: FC<CheckBoxProps> = (props) => {
  return (
    <label style={{display: 'block'}}>
      <input
        type="checkbox"
        name={ props.label }
        checked={ props.checked }
        onChange={ props.onChange }
        disabled={ props.disabled }
      />
      { props.label }
    </label>
  )
}

type CheckBoxProps = {
  checked?: boolean,
  onChange?: any,
  label: string,
  key: number,
  disabled?: boolean
}
