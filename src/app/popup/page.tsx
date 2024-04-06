"use client"
import React, { useState } from 'react'
import AddTax from "@/app/components/settings/popup/AddTax"

const [taxState, setTaxState] = useState<boolean | null>(false)

function page() {
  return (
    <div>
        <AddTax close={setTaxState}  />
    </div>
  )
}

export default page