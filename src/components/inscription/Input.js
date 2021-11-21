import { Input as InputField, Label } from 'semantic-ui-react'
import { forwardRef } from 'react'

const Input = forwardRef(
  ({ type = 'text', name, style, error, ...props }, ref) => (
    <>
      <InputField
        transparent={name === 'skill'}
        type={type}
        ref={ref}
        {...props}
        style={{
          ...style,
          boxShadow: error && '0 0 5px #CC0000',
          backgroundColor: error && '#ffe4e1',
        }}
      />
      {error && (
        <Label pointing prompt>
          {error}
        </Label>
      )}
    </>
  )
)

export default Input
