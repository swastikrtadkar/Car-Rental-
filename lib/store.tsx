'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  initialBookings,
  initialCars,
  initialPayments,
  initialReviews,
  initialSavedCards,
  initialSettings,
  initialUsers,
} from './mock-data'
import { calculatePrice, hasConflict, todayISO } from './format'
import type {
  AppSettings,
  Booking,
  BookingDraft,
  BookingStatus,
  Car,
  Payment,
  PaymentMethod,
  Review,
  SavedCard,
  User,
} from './types'

type Result<T = undefined> = { ok: true; data: T } | { ok: false; error: string }

interface Store {
  cars: Car[]
  users: User[]
  bookings: Booking[]
  payments: Payment[]
  reviews: Review[]
  savedCards: SavedCard[]
  settings: AppSettings
  currentUser: User | null
  draft: BookingDraft | null

  login: (email: string, password: string) => Result<User>
  register: (input: { name: string; email: string; phone: string; password: string }) => Result<User>
  logout: () => void
  updateProfile: (patch: Partial<Pick<User, 'name' | 'phone' | 'address' | 'email'>>) => void
  changePassword: (current: string, next: string) => Result

  setDraft: (draft: BookingDraft | null) => void
  updateDraft: (patch: Partial<BookingDraft>) => void
  confirmDraftBooking: (method: PaymentMethod) => Result<Booking>
  setBookingStatus: (id: string, status: BookingStatus) => void

  addCar: (car: Omit<Car, 'id' | 'rating' | 'reviewCount'>) => Car
  updateCar: (id: string, patch: Partial<Car>) => void
  deleteCar: (id: string) => void

  toggleUserActive: (id: string) => void
  addReview: (input: Omit<Review, 'id' | 'createdAt' | 'userId'>) => void
  deleteReview: (id: string) => void
  updateSettings: (patch: Partial<AppSettings>) => void
  addSavedCard: (card: Omit<SavedCard, 'id'>) => void
  removeSavedCard: (id: string) => void
}

const StoreContext = createContext<Store | null>(null)

function randomId(prefix: string) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}${Date.now().toString().slice(-3)}`
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [savedCards, setSavedCards] = useState<SavedCard[]>(initialSavedCards)
  const [settings, setSettings] = useState<AppSettings>(initialSettings)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [draft, setDraftState] = useState<BookingDraft | null>(null)

  const currentUser = users.find((u) => u.id === currentUserId) ?? null

  const login = useCallback<Store['login']>(
    (email, password) => {
      const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (!user || user.password !== password) {
        return { ok: false, error: 'Invalid email or password.' }
      }
      if (!user.isActive) {
        return { ok: false, error: 'This account has been deactivated. Contact support.' }
      }
      setCurrentUserId(user.id)
      return { ok: true, data: user }
    },
    [users],
  )

  const register = useCallback<Store['register']>(
    (input) => {
      if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
        return { ok: false, error: 'An account with this email already exists.' }
      }
      const user: User = {
        id: randomId('USR'),
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        password: input.password,
        role: 'customer',
        isActive: true,
        createdAt: todayISO(),
      }
      setUsers((prev) => [...prev, user])
      setCurrentUserId(user.id)
      return { ok: true, data: user }
    },
    [users],
  )

  const logout = useCallback(() => {
    setCurrentUserId(null)
    setDraftState(null)
  }, [])

  const updateProfile = useCallback<Store['updateProfile']>(
    (patch) => {
      setUsers((prev) => prev.map((u) => (u.id === currentUserId ? { ...u, ...patch } : u)))
    },
    [currentUserId],
  )

  const changePassword = useCallback<Store['changePassword']>(
    (current, next) => {
      if (!currentUser || currentUser.password !== current) {
        return { ok: false, error: 'Current password is incorrect.' }
      }
      setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, password: next } : u)))
      return { ok: true, data: undefined }
    },
    [currentUser],
  )

  const setDraft = useCallback((d: BookingDraft | null) => setDraftState(d), [])
  const updateDraft = useCallback<Store['updateDraft']>(
    (patch) => setDraftState((prev) => (prev ? { ...prev, ...patch } : prev)),
    [],
  )

  const confirmDraftBooking = useCallback<Store['confirmDraftBooking']>(
    (method) => {
      if (!draft || !currentUser) return { ok: false, error: 'No booking in progress.' }
      const car = cars.find((c) => c.id === draft.carId)
      if (!car || car.availabilityStatus !== 'available') {
        return { ok: false, error: 'This car is no longer available.' }
      }
      if (hasConflict(bookings, car.id, draft.pickupDate, draft.returnDate)) {
        return { ok: false, error: 'This car was just booked for the selected dates.' }
      }
      const price = calculatePrice(car, draft.pickupDate, draft.returnDate, settings)
      const booking: Booking = {
        id: `BK-${2000 + bookings.length}`,
        userId: currentUser.id,
        carId: car.id,
        pickupDate: draft.pickupDate,
        returnDate: draft.returnDate,
        pickupTime: draft.pickupTime,
        returnTime: draft.returnTime,
        pickupLocation: draft.pickupLocation,
        returnLocation: draft.returnLocation,
        rentalDays: price.rentalDays,
        subtotal: price.subtotal,
        tax: price.tax,
        deposit: price.deposit,
        discount: price.discount,
        totalAmount: price.totalAmount,
        bookingStatus: 'confirmed',
        paymentStatus: 'paid',
        createdAt: todayISO(),
      }
      const payment: Payment = {
        id: `PAY-${6000 + payments.length}`,
        bookingId: booking.id,
        amount: booking.totalAmount,
        paymentMethod: method,
        paymentStatus: 'paid',
        transactionId: `TXN${Date.now().toString(36).toUpperCase()}`,
        paymentDate: todayISO(),
      }
      setBookings((prev) => [booking, ...prev])
      setPayments((prev) => [payment, ...prev])
      setDraftState(null)
      return { ok: true, data: booking }
    },
    [draft, currentUser, cars, bookings, payments.length, settings],
  )

  const setBookingStatus = useCallback<Store['setBookingStatus']>(
    (id, status) => {
      const booking = bookings.find((b) => b.id === id)
      if (!booking) return
      const refund = status === 'cancelled' || status === 'rejected'
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                bookingStatus: status,
                paymentStatus: refund && b.paymentStatus === 'paid' ? 'refunded' : status === 'confirmed' && b.paymentStatus === 'pending' ? 'paid' : b.paymentStatus,
              }
            : b,
        ),
      )
      if (refund) {
        setPayments((prev) =>
          prev.map((p) => (p.bookingId === id && p.paymentStatus === 'paid' ? { ...p, paymentStatus: 'refunded' } : p)),
        )
      }
      if (status === 'confirmed' && booking.paymentStatus === 'pending') {
        setPayments((prev) => [
          {
            id: `PAY-${6000 + prev.length}`,
            bookingId: id,
            amount: booking.totalAmount,
            paymentMethod: 'UPI',
            paymentStatus: 'paid',
            transactionId: `TXN${Date.now().toString(36).toUpperCase()}`,
            paymentDate: todayISO(),
          },
          ...prev,
        ])
      }
      if (status === 'active') {
        setCars((prev) => prev.map((c) => (c.id === booking.carId ? { ...c, availabilityStatus: 'booked' } : c)))
      }
      if (status === 'completed' || (booking.bookingStatus === 'active' && refund)) {
        setCars((prev) => prev.map((c) => (c.id === booking.carId ? { ...c, availabilityStatus: 'available' } : c)))
      }
    },
    [bookings],
  )

  const addCar = useCallback<Store['addCar']>((input) => {
    const car: Car = { ...input, id: randomId('CAR'), rating: 0, reviewCount: 0 }
    setCars((prev) => [car, ...prev])
    return car
  }, [])

  const updateCar = useCallback<Store['updateCar']>((id, patch) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }, [])

  const deleteCar = useCallback<Store['deleteCar']>((id) => {
    setCars((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const toggleUserActive = useCallback<Store['toggleUserActive']>((id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)))
  }, [])

  const addReview = useCallback<Store['addReview']>(
    (input) => {
      if (!currentUser) return
      setReviews((prev) => [
        { ...input, id: randomId('REV'), userId: currentUser.id, createdAt: todayISO() },
        ...prev,
      ])
    },
    [currentUser],
  )

  const deleteReview = useCallback<Store['deleteReview']>((id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const updateSettings = useCallback<Store['updateSettings']>((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const addSavedCard = useCallback<Store['addSavedCard']>((card) => {
    setSavedCards((prev) => [...prev, { ...card, id: randomId('card') }])
  }, [])

  const removeSavedCard = useCallback<Store['removeSavedCard']>((id) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const value = useMemo<Store>(
    () => ({
      cars,
      users,
      bookings,
      payments,
      reviews,
      savedCards,
      settings,
      currentUser,
      draft,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      setDraft,
      updateDraft,
      confirmDraftBooking,
      setBookingStatus,
      addCar,
      updateCar,
      deleteCar,
      toggleUserActive,
      addReview,
      deleteReview,
      updateSettings,
      addSavedCard,
      removeSavedCard,
    }),
    [
      cars, users, bookings, payments, reviews, savedCards, settings, currentUser, draft,
      login, register, logout, updateProfile, changePassword, setDraft, updateDraft,
      confirmDraftBooking, setBookingStatus, addCar, updateCar, deleteCar, toggleUserActive,
      addReview, deleteReview, updateSettings, addSavedCard, removeSavedCard,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
