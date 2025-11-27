'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function QuickCalculator() {
  const [income, setIncome] = React.useState('')
  const [deductions, setDeductions] = React.useState('')
  const [result, setResult] = React.useState<null | { totalIncome: number; taxableIncome: number; totalTax: number }>(null)

  const calculate = () => {
    const totalIncome = Number(income || 0)
    const totalDeductions = Number(deductions || 0)

    const exemptionLimit = 350000
    let taxableIncome = totalIncome - exemptionLimit - totalDeductions
    if (taxableIncome < 0) taxableIncome = 0

    let tax = 0
    if (taxableIncome <= 100000) {
      tax = 0
    } else if (taxableIncome <= 400000) {
      tax = (taxableIncome - 100000) * 0.05
    } else if (taxableIncome <= 700000) {
      tax = 15000 + (taxableIncome - 400000) * 0.10
    } else if (taxableIncome <= 1100000) {
      tax = 45000 + (taxableIncome - 700000) * 0.15
    } else if (taxableIncome <= 1600000) {
      tax = 105000 + (taxableIncome - 1100000) * 0.20
    } else {
      tax = 205000 + (taxableIncome - 1600000) * 0.25
    }

    const minimumTax = Math.max(5000, totalIncome * 0.005)
    tax = Math.max(tax, minimumTax)

    setResult({ totalIncome, taxableIncome, totalTax: Math.round(tax) })
  }

  const reset = () => {
    setIncome('')
    setDeductions('')
    setResult(null)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        <label className="text-sm text-muted-foreground">Total Income (৳)</label>
        <Input type="number" value={income} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncome(e.target.value)} placeholder="0" />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label className="text-sm text-muted-foreground">Total Deductions (৳)</label>
        <Input type="number" value={deductions} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeductions(e.target.value)} placeholder="0" />
      </div>

      <div className="flex space-x-2">
        <Button size="sm" onClick={calculate} className="flex-1">Calculate</Button>
        <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
      </div>

      {result && (
        <div className="mt-2 p-3 bg-muted/5 rounded-md">
          <div className="flex justify-between text-sm">
            <span>Total Income</span>
            <span className="font-medium">৳ {result.totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxable Income</span>
            <span className="font-medium">৳ {result.taxableIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mt-2 border-t pt-2">
            <span className="font-medium">Estimated Tax</span>
            <span className="font-bold text-primary">৳ {result.totalTax.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
