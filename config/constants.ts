import { Home, Building, Building2, Key, MapPin, Briefcase } from "lucide-react"

export const PROPERTY_TYPES = [
  { id: "single", icon: Home, title: "Single House Property", description: "Single unit house for single family" },
  { id: "apartments", icon: Building, title: "Apartments complex", description: "Multiple unit house for families" },
  { id: "condominiums", icon: Building2, title: "Condominiums", description: "Multiple unit house for families" },
] as const

export const USER_ROLES = [
  { id: "landlord", icon: Key, title: "Landlord", description: "Owner of the property" },
  { id: "realtor", icon: MapPin, title: "Realtor", description: "Manage property on behalf on owner" },
  {
    id: "property-management",
    icon: Briefcase,
    title: "Property management company",
    description: "For management company",
  },
] as const

export const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
]

export const STATE_OPTIONS = [
  { value: "tx", label: "Texas" },
  { value: "ca", label: "California" },
]
