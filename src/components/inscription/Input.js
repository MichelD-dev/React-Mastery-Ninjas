import { Input as InputField, Label } from 'semantic-ui-react'
import { forwardRef } from 'react'

const Input = forwardRef(({ type = 'text', error, ...props }, ref) => (
  <>
    <InputField
      type={type}
      ref={ref}
      {...props}
      style={{
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
))

export default Input
