"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { AddCardModal } from "./modals/add-card-modal";
import { AppHeader } from "./ui/core-components";

interface PricingPageProps {
  onBack: () => void;
}

export function PricingPage({ onBack }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [paymentCards, setPaymentCards] = useState([
    { id: "1", name: "Alex jones", type: "Amex card", number: "******5565" },
    { id: "2", name: "Alex jones", type: "Amex card", number: "******5565" },
    { id: "3", name: "Alex jones", type: "Amex card", number: "******5565" },
  ]);

  const plans = [
    {
      id: "regular",
      name: "Regular",
      price: billingCycle === "monthly" ? 99.99 : 83.99,
      description: "Price for 1-50 unit",
      features: [],
    },
    {
      id: "platinum",
      name: "Platinum",
      price: billingCycle === "monthly" ? 129.99 : 109.99,
      description: "Price for 1-50 unit",
      features: [],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingCycle === "monthly" ? 199.99 : 169.99,
      description: "Price for 1-50 unit",
      features: [],
    },
  ];

  const handleAddCard = (cardData: any) => {
    const newCard = {
      id: Date.now().toString(),
      name: cardData.name,
      type: "Credit card",
      number: `******${cardData.number.slice(-4)}`,
    };
    setPaymentCards([...paymentCards, newCard]);
    setShowAddCardModal(false);
  };

  const calculateTotal = () => {
    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
    return selectedPlanData ? selectedPlanData.price : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto p-6">
        <AppHeader />

        {/* Main Content Card */}
        <Card className="p-8 border-2 border-blue-200">
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900 mb-6">
            Chose a plan for after 30-days free trial
          </h1>

          {/* Billing Toggle */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              className={
                billingCycle === "monthly" ? "bg-blue-100 text-blue-800" : ""
              }
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annually" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("annually")}
              className={
                billingCycle === "annually" ? "bg-blue-100 text-blue-800" : ""
              }
            >
              Annually
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                (save 57%)
              </Badge>
            </Button>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {plan.name}
                    </h3>
                    {plan.id === "regular" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="auto-pay"
                          checked={autoPayEnabled}
                          onCheckedChange={(checked) =>
                            setAutoPayEnabled(!!checked)
                          }
                        />
                        <label
                          htmlFor="auto-pay"
                          className="text-sm text-gray-600"
                        >
                          Auto Pay
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Options */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payment option
              </h3>
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => setShowAddCardModal(true)}
              >
                Add new card
              </Button>
            </div>

            {/* Payment Cards */}
            <div className="space-y-3">
              {paymentCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {card.name}({card.type}) {card.number}
                    </span>
                  </div>
                  <Button
                    variant={selectedCard === card.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCard(card.id)}
                    className={
                      selectedCard === card.id ? "bg-blue-600 text-white" : ""
                    }
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" className="text-gray-600" onClick={onBack}>
            Back
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-900">
              Total with card charge:{" "}
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </span>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={!selectedPlan || !selectedCard}
            >
              Pay & add property
            </Button>
          </div>
        </div>

        {/* Add Card Modal */}
        <AddCardModal
          isOpen={showAddCardModal}
          onClose={() => setShowAddCardModal(false)}
          onAdd={handleAddCard}
        />
      </div>
    </div>
  );
}
