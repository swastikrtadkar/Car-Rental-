import type {
  AppSettings,
  Booking,
  BookingStatus,
  Car,
  Payment,
  PaymentMethod,
  Review,
  SavedCard,
  User,
} from './types'

export const LOCATIONS = [
  'Mumbai',
  'Pune',
  'Bengaluru',
  'Delhi',
  'Hyderabad',
  'Chennai',
] as const

export const CATEGORIES = ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Electric'] as const
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'CNG'] as const
export const TRANSMISSIONS = ['Manual', 'Automatic'] as const
export const BRANDS = [
  'Toyota',
  'Honda',
  'Hyundai',
  'Kia',
  'Tata',
  'Mahindra',
  'Maruti Suzuki',
] as const

export const ALL_FEATURES = [
  'Bluetooth',
  'Android Auto',
  'Apple CarPlay',
  'Reverse Camera',
  'Cruise Control',
  'Sunroof',
  'GPS Navigation',
  'Keyless Entry',
  'Airbags',
  'ABS',
  'Ventilated Seats',
  '360° Camera',
  'Fast Charging',
  '4x4',
  'USB Charging',
  'Rear AC Vents',
]

export const initialCars: Car[] = [
  {
    id: 'CAR-001',
    brand: 'Toyota',
    model: 'Innova Crysta',
    year: 2024,
    category: 'SUV',
    pricePerDay: 3500,
    fuelType: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: '15 km/l',
    location: 'Mumbai',
    description:
      'The go-to choice for family road trips. Spacious captain seats, a smooth diesel engine and legendary Toyota reliability make every long drive comfortable.',
    image: '/images/cars/toyota-innova.png',
    features: ['Bluetooth', 'Reverse Camera', 'Airbags', 'ABS', 'Rear AC Vents', 'USB Charging'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 'CAR-002',
    brand: 'Toyota',
    model: 'Fortuner Legender',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 6500,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '10 km/l',
    location: 'Delhi',
    description:
      'A commanding full-size SUV with premium interiors, a powerful 2.8L diesel engine and 4x4 capability for highways and hills alike.',
    image: '/images/cars/toyota-fortuner.png',
    features: ['Apple CarPlay', 'Android Auto', 'Cruise Control', 'Ventilated Seats', '4x4', 'Airbags', 'ABS', 'Keyless Entry'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: 'CAR-003',
    brand: 'Honda',
    model: 'City',
    year: 2023,
    category: 'Sedan',
    pricePerDay: 2600,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '18 km/l',
    location: 'Pune',
    description:
      'An elegant, refined sedan with a smooth CVT gearbox. Ideal for business travel and comfortable city commutes.',
    image: '/images/cars/honda-city.png',
    features: ['Bluetooth', 'Apple CarPlay', 'Android Auto', 'Sunroof', 'Airbags', 'ABS', 'Keyless Entry'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 'CAR-004',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2024,
    category: 'SUV',
    pricePerDay: 3200,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 5,
    mileage: '19 km/l',
    location: 'Bengaluru',
    description:
      'India’s favourite compact SUV with a panoramic sunroof, connected tech and a punchy yet efficient diesel engine.',
    image: '/images/cars/hyundai-creta.png',
    features: ['Sunroof', 'Ventilated Seats', 'Apple CarPlay', 'Android Auto', '360° Camera', 'Airbags', 'ABS'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: 'CAR-005',
    brand: 'Hyundai',
    model: 'i20',
    year: 2023,
    category: 'Hatchback',
    pricePerDay: 1800,
    fuelType: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '20 km/l',
    location: 'Hyderabad',
    description:
      'A stylish premium hatchback that is easy to park and fun to drive. Perfect for solo travellers and couples exploring the city.',
    image: '/images/cars/hyundai-i20.png',
    features: ['Bluetooth', 'Android Auto', 'Reverse Camera', 'Airbags', 'ABS', 'USB Charging'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 'CAR-006',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    year: 2024,
    category: 'Electric',
    pricePerDay: 7000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    mileage: '631 km range',
    location: 'Bengaluru',
    description:
      'A futuristic premium EV with ultra-fast charging, a lounge-like cabin and a 631 km certified range. Zero emissions, maximum style.',
    image: '/images/cars/hyundai-ioniq5.png',
    features: ['Fast Charging', 'Apple CarPlay', 'Android Auto', 'Ventilated Seats', '360° Camera', 'Cruise Control', 'Airbags'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.9,
    reviewCount: 41,
  },
  {
    id: 'CAR-007',
    brand: 'Kia',
    model: 'Seltos',
    year: 2024,
    category: 'SUV',
    pricePerDay: 3100,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '17 km/l',
    location: 'Chennai',
    description:
      'A feature-packed SUV with bold styling, a turbo-petrol engine and a premium Bose sound system for memorable road trips.',
    image: '/images/cars/kia-seltos.png',
    features: ['Sunroof', 'Apple CarPlay', 'Android Auto', 'Ventilated Seats', 'Airbags', 'ABS', 'Keyless Entry'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: 'CAR-008',
    brand: 'Kia',
    model: 'Carnival',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 8000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '13 km/l',
    location: 'Mumbai',
    description:
      'A luxury MPV with VIP lounge seating, dual sunroofs and powered sliding doors. Ideal for corporate travel and weddings.',
    image: '/images/cars/kia-carnival.png',
    features: ['Sunroof', 'Ventilated Seats', 'Rear AC Vents', 'Cruise Control', 'Apple CarPlay', 'Airbags', 'ABS'],
    availabilityStatus: 'maintenance',
    airConditioning: true,
    rating: 4.7,
    reviewCount: 36,
  },
  {
    id: 'CAR-009',
    brand: 'Tata',
    model: 'Nexon EV',
    year: 2024,
    category: 'Electric',
    pricePerDay: 2900,
    fuelType: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    mileage: '465 km range',
    location: 'Pune',
    description:
      'India’s best-selling electric SUV. Quiet, quick and economical with a 5-star safety rating and connected car features.',
    image: '/images/cars/tata-nexon-ev.png',
    features: ['Fast Charging', 'Sunroof', 'Android Auto', 'Apple CarPlay', 'Airbags', 'ABS', '360° Camera'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.6,
    reviewCount: 77,
  },
  {
    id: 'CAR-010',
    brand: 'Tata',
    model: 'Tiago',
    year: 2023,
    category: 'Hatchback',
    pricePerDay: 1400,
    fuelType: 'CNG',
    transmission: 'Manual',
    seats: 5,
    mileage: '26 km/kg',
    location: 'Delhi',
    description:
      'A budget-friendly, fuel-efficient hatchback with twin-cylinder CNG. The smartest choice for everyday city errands.',
    image: '/images/cars/tata-tiago.png',
    features: ['Bluetooth', 'Airbags', 'ABS', 'USB Charging', 'Reverse Camera'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.3,
    reviewCount: 64,
  },
  {
    id: 'CAR-011',
    brand: 'Mahindra',
    model: 'XUV700',
    year: 2024,
    category: 'SUV',
    pricePerDay: 4200,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '15 km/l',
    location: 'Hyderabad',
    description:
      'A tech-loaded 7-seater with ADAS, a panoramic sunroof and a dual-screen dashboard. Built for families who want it all.',
    image: '/images/cars/mahindra-xuv700.png',
    features: ['Sunroof', 'Cruise Control', '360° Camera', 'Apple CarPlay', 'Android Auto', 'Airbags', 'ABS', 'Keyless Entry'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.8,
    reviewCount: 139,
  },
  {
    id: 'CAR-012',
    brand: 'Mahindra',
    model: 'Thar',
    year: 2023,
    category: 'SUV',
    pricePerDay: 3800,
    fuelType: 'Diesel',
    transmission: 'Manual',
    seats: 4,
    mileage: '14 km/l',
    location: 'Mumbai',
    description:
      'An iconic off-roader with 4x4 and a convertible spirit. Take it to the Western Ghats or the beaches of Goa.',
    image: '/images/cars/mahindra-thar.png',
    features: ['4x4', 'Bluetooth', 'Android Auto', 'Airbags', 'ABS', 'USB Charging'],
    availabilityStatus: 'booked',
    airConditioning: true,
    rating: 4.7,
    reviewCount: 92,
  },
  {
    id: 'CAR-013',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    year: 2024,
    category: 'Hatchback',
    pricePerDay: 1500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '24 km/l',
    location: 'Chennai',
    description:
      'The sporty, peppy hatchback everyone loves. Excellent fuel economy and nimble handling for city and highway use.',
    image: '/images/cars/maruti-swift.png',
    features: ['Bluetooth', 'Apple CarPlay', 'Android Auto', 'Airbags', 'ABS', 'Keyless Entry'],
    availabilityStatus: 'available',
    airConditioning: true,
    rating: 4.5,
    reviewCount: 181,
  },
]

export const initialUsers: User[] = [
  {
    id: 'USR-000',
    name: 'Admin User',
    email: 'admin@driveeasy.com',
    password: 'admin123',
    phone: '9800000000',
    role: 'admin',
    address: 'DriveEasy HQ, Andheri East, Mumbai',
    isActive: true,
    createdAt: '2025-06-01',
  },
  {
    id: 'USR-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123',
    phone: '9876543210',
    role: 'customer',
    address: '12, Shivaji Nagar, Pune, Maharashtra 411005',
    isActive: true,
    createdAt: '2025-11-14',
  },
  ...[
    ['Priya Patel', 'priya.patel@example.com', '9823456710', 'Bengaluru', '2025-12-02'],
    ['Amit Verma', 'amit.verma@example.com', '9811122233', 'Delhi', '2026-01-09'],
    ['Sneha Iyer', 'sneha.iyer@example.com', '9845098450', 'Chennai', '2026-01-21'],
    ['Arjun Reddy', 'arjun.reddy@example.com', '9848012345', 'Hyderabad', '2026-02-03'],
    ['Kavya Nair', 'kavya.nair@example.com', '9895067890', 'Bengaluru', '2026-02-17'],
    ['Rohan Mehta', 'rohan.mehta@example.com', '9820011223', 'Mumbai', '2026-03-05'],
    ['Ananya Gupta', 'ananya.gupta@example.com', '9810055667', 'Delhi', '2026-03-28'],
    ['Vikram Singh', 'vikram.singh@example.com', '9829033445', 'Pune', '2026-04-11'],
    ['Neha Joshi', 'neha.joshi@example.com', '9822077889', 'Pune', '2026-05-06'],
    ['Karthik Rao', 'karthik.rao@example.com', '9880099001', 'Bengaluru', '2026-06-19'],
    ['Isha Kapoor', 'isha.kapoor@example.com', '9818044556', 'Mumbai', '2026-07-23'],
  ].map(([name, email, phone, city, createdAt], i) => ({
    id: `USR-${String(i + 2).padStart(3, '0')}`,
    name,
    email,
    password: 'password123',
    phone,
    role: 'customer' as const,
    address: `${city}, India`,
    isActive: i !== 6,
    createdAt,
  })),
]

export const initialSettings: AppSettings = {
  companyName: 'DriveEasy Rentals Pvt. Ltd.',
  supportEmail: 'support@driveeasy.com',
  supportPhone: '+91 98000 00000',
  taxRate: 18,
  standardDeposit: 5000,
  luxuryDeposit: 10000,
  longRentalDays: 7,
  longRentalDiscount: 10,
  emailNotifications: true,
  smsNotifications: false,
  maintenanceMode: false,
}

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function priceBooking(car: Car, days: number) {
  const subtotal = car.pricePerDay * days
  const discount =
    days >= initialSettings.longRentalDays
      ? Math.round((subtotal * initialSettings.longRentalDiscount) / 100)
      : 0
  const tax = Math.round(((subtotal - discount) * initialSettings.taxRate) / 100)
  const deposit =
    car.category === 'Luxury' ? initialSettings.luxuryDeposit : initialSettings.standardDeposit
  return { subtotal, discount, tax, deposit, totalAmount: subtotal - discount + tax + deposit }
}

function makeBooking(
  n: number,
  userId: string,
  car: Car,
  pickupDate: string,
  days: number,
  bookingStatus: BookingStatus,
): Booking {
  const paymentStatus =
    bookingStatus === 'cancelled'
      ? 'refunded'
      : bookingStatus === 'rejected'
        ? 'refunded'
        : bookingStatus === 'pending'
          ? 'pending'
          : 'paid'
  return {
    id: `BK-${String(1000 + n)}`,
    userId,
    carId: car.id,
    pickupDate,
    returnDate: addDays(pickupDate, days),
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: car.location,
    returnLocation: car.location,
    rentalDays: days,
    ...priceBooking(car, days),
    bookingStatus,
    paymentStatus,
    createdAt: addDays(pickupDate, -5),
  }
}

function buildBookings(): Booking[] {
  const rand = seeded(42)
  const customers = initialUsers.filter((u) => u.role === 'customer')
  const bookable = initialCars
  const list: Booking[] = []
  let n = 1

  for (let month = 0; month < 9; month++) {
    const count = 3 + Math.floor(rand() * 3) + Math.floor(month / 3)
    for (let i = 0; i < count; i++) {
      const car = bookable[Math.floor(rand() * bookable.length)]
      const user = customers[1 + Math.floor(rand() * (customers.length - 1))]
      const day = 1 + Math.floor(rand() * 24)
      const pickup = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      if (pickup >= '2026-09-20') continue
      const days = 1 + Math.floor(rand() * 8)
      const status: BookingStatus = rand() < 0.1 ? 'cancelled' : 'completed'
      list.push(makeBooking(n++, user.id, car, pickup, days, status))
    }
  }

  const byId = (id: string) => initialCars.find((c) => c.id === id)!
  const rahul = 'USR-001'
  list.push(makeBooking(n++, rahul, byId('CAR-003'), '2026-06-12', 3, 'completed'))
  list.push(makeBooking(n++, rahul, byId('CAR-011'), '2026-08-02', 5, 'completed'))
  list.push(makeBooking(n++, rahul, byId('CAR-005'), '2026-08-24', 2, 'cancelled'))
  list.push(makeBooking(n++, rahul, byId('CAR-012'), '2026-09-26', 4, 'active'))
  list.push(makeBooking(n++, rahul, byId('CAR-004'), '2026-10-09', 3, 'confirmed'))
  list.push(makeBooking(n++, 'USR-002', byId('CAR-002'), '2026-10-02', 7, 'pending'))
  list.push(makeBooking(n++, 'USR-005', byId('CAR-009'), '2026-10-04', 2, 'pending'))
  list.push(makeBooking(n++, 'USR-007', byId('CAR-007'), '2026-10-11', 4, 'confirmed'))
  list.push(makeBooking(n++, 'USR-003', byId('CAR-001'), '2026-09-25', 6, 'active'))
  list.push(makeBooking(n++, 'USR-010', byId('CAR-006'), '2026-10-15', 3, 'pending'))

  return list.sort((a, b) => b.pickupDate.localeCompare(a.pickupDate))
}

export const initialBookings: Booking[] = buildBookings()

const METHODS: PaymentMethod[] = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking']

export const initialPayments: Payment[] = initialBookings
  .filter((b) => b.paymentStatus !== 'pending')
  .map((b, i) => ({
    id: `PAY-${String(5000 + i)}`,
    bookingId: b.id,
    amount: b.totalAmount,
    paymentMethod: METHODS[i % METHODS.length],
    paymentStatus: b.paymentStatus,
    transactionId: `TXN${(987654321 + i * 7919).toString(36).toUpperCase()}`,
    paymentDate: b.createdAt,
  }))

export const initialReviews: Review[] = [
  ['USR-001', 'CAR-003', 5, 'Super clean car and the pickup at Pune station was on time. The CVT is buttery smooth in traffic.', '2026-06-16'],
  ['USR-001', 'CAR-011', 5, 'XUV700 was perfect for our Lonavala trip with family. ADAS on the expressway was a nice touch.', '2026-08-08'],
  ['USR-002', 'CAR-004', 4, 'Creta was comfortable and fuel efficient. Minor delay during handover but staff were polite.', '2026-05-21'],
  ['USR-003', 'CAR-010', 4, 'Great value for money. CNG kept my fuel costs super low for a week in Delhi.', '2026-04-10'],
  ['USR-004', 'CAR-007', 5, 'Loved the Seltos! Booking was quick and the car was delivered fully sanitised.', '2026-07-02'],
  ['USR-005', 'CAR-006', 5, 'First time driving an EV and the Ioniq 5 blew me away. Charging stations were easy to find.', '2026-08-19'],
  ['USR-006', 'CAR-002', 5, 'The Fortuner handled the Himachal roads effortlessly. Premium experience end to end.', '2026-06-29'],
  ['USR-007', 'CAR-013', 4, 'Swift is always fun. Transparent pricing, no hidden charges.', '2026-03-17'],
  ['USR-008', 'CAR-001', 5, 'Innova Crysta for a wedding in Mumbai — spacious and the driver-friendly handover was smooth.', '2026-02-26'],
  ['USR-009', 'CAR-012', 4, 'Thar was a blast in the ghats. Would love an automatic option next time.', '2026-07-30'],
  ['USR-010', 'CAR-009', 4, 'Nexon EV is quiet and punchy. The app-based booking made it very convenient.', '2026-09-05'],
  ['USR-011', 'CAR-005', 3, 'Car was fine but had a small scratch that was not noted in the checklist.', '2026-09-12'],
].map(([userId, carId, rating, comment, createdAt], i) => ({
  id: `REV-${String(i + 1).padStart(3, '0')}`,
  userId: userId as string,
  carId: carId as string,
  rating: rating as number,
  comment: comment as string,
  createdAt: createdAt as string,
}))

export const initialSavedCards: SavedCard[] = [
  { id: 'card-1', brand: 'Visa', last4: '4242', expiry: '08/28', holder: 'Rahul Sharma' },
  { id: 'card-2', brand: 'RuPay', last4: '6521', expiry: '02/27', holder: 'Rahul Sharma' },
]
