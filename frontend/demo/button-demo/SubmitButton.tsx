'use client'
import { Button } from '@/components/ui/button'
import { btnType } from '@/types/Types'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({name, type, onClick}:btnType) => {
    const {pending} = useFormStatus();
  return (
    <Button type={type} onClick={onClick} disabled={pending}>
      {name}
    </Button>
  )
}

export default SubmitButton
