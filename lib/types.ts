export type Role = 'customer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  role: Role
  address?: string
  avatar?: string
  isActive: boolean
  createdAt: string
}

export type CarCategory = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Electric'
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'CNG'
export type Transmission = 'Manual' | 'Automatic'
export type AvailabilityStatus = 'available' | 'booked' | 'maintenance'

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  category: CarCategory
  pricePerDay: number
  fuelType: FuelType
  transmission: Transmission
  seats: number
  mileage: string
  location: string
  description: string
  image: string
  features: string[]
  availabilityStatus: AvailabilityStatus
  airConditioning: boolean
  rating: number
  reviewCount: number
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'rejected'

export type PaymentStatus = 'paid' | 'pending' | 'refunded' | 'failed'

export interface Booking {
  id: string
  userId: string
  carId: string
  pickupDate: string
  returnDate: string
  pickupTime: string
  returnTime: string
  pickupLocation: string
  returnLocation: string
  rentalDays: number
  subtotal: number
  tax: number
  deposit: number
  discount: number
  totalAmount: number
  bookingStatus: BookingStatus
  paymentStatus: PaymentStatus
  createdAt: string
}

export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'UPI' | 'Net Banking'

export interface Payment {
  id: string
  bookingId: string
  amount: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  transactionId: string
  paymentDate: string
}

export interface Review {
  id: string
  userId: string
  carId: string
  rating: number
  comment: string
  createdAt: string
}

export interface SavedCard {
  id: string
  brand: 'Visa' | 'Mastercard' | 'RuPay'
  last4: string
  expiry: string
  holder: string
}

export interface AppSettings {
  companyName: string
  supportEmail: string
  supportPhone: string
  taxRate: number
  standardDeposit: number
  luxuryDeposit: number
  longRentalDays: number
  longRentalDiscount: number
  emailNotifications: boolean
  smsNotifications: boolean
  maintenanceMode: boolean
}

export interface BookingDraft {
  carId: string
  pickupDate: string
  returnDate: string
  pickupTime: string
  returnTime: string
  pickupLocation: string
  returnLocation: string
  customer: {
    name: string
    email: string
    phone: string
    licenseNumber: string
    address: string
  }
}
