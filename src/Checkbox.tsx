import React, { FC } from 'react'

export const Checkbox: FC<CheckBoxProps> = (props) => {
  return (
    <label style={{display: 'block'}}>
      <input
        type="checkbox"
        // id={id}
        // name={name}
        checked={ props.checked }
        // defaultChecked={defaultChecked}
        onChange={ props.onChange }
        disabled={props.disabled}
      />
      { props.label }
    </label>
  )
}

type CheckBoxProps = {
  checked: boolean,
  onChange: any,
  label: string,
  disabled: boolean
}
