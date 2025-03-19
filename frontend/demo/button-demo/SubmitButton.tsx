'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { btnType } from '@/types/Types'


const SubmitButton = ({name, type, onClick, disabled}:btnType) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {name}
    </Button>
  )
}

export default SubmitButton
