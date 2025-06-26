"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, HelpCircle } from "lucide-react"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
}

export function AddCardModal({ isOpen, onClose, onAdd }: AddCardModalProps) {
  const [nameOnCard, setNameOnCard] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expireDate, setExpireDate] = useState("")
  const [cvc, setCvc] = useState("")

  const handleSubmit = () => {
    const cardData = {
      name: nameOnCard,
      number: cardNumber,
      expireDate,
      cvc,
    }
    onAdd?.(cardData)
    // Reset form
    setNameOnCard("")
    setCardNumber("")
    setExpireDate("")
    setCvc("")
  }

  const handleClose = () => {
    // Reset form when closing
    setNameOnCard("")
    setCardNumber("")
    setExpireDate("")
    setCvc("")
    onClose()
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
  }

  const formatExpireDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2, 4)
    }
    return digits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpireDate(e.target.value)
    setExpireDate(formatted)
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "")
    setCvc(digits.slice(0, 4)) // Limit to 4 digits
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Add new card</h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on card</Label>
              <Input
                id="name-on-card"
                placeholder="Alex jones"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-4 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expire-date">Expire date</Label>
              <Input
                id="expire-date"
                placeholder="MM/YY"
                value={expireDate}
                onChange={handleExpireDateChange}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <div className="relative">
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={handleCvcChange}
                  className="pr-8"
                  maxLength={4}
                />
                <HelpCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!nameOnCard || !cardNumber || !expireDate || !cvc}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
