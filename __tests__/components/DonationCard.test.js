import { render, screen } from '@testing-library/react'
import DonationCard from '@/components/DonationCard'

const baseDonation = {
  id: '7',
  foodName: 'Veg Biryani Trays',
  quantity: '12 kg',
  category: 'Cooked Food',
  expiryTime: '2026-03-30T18:00:00Z',
  location: 'Koregaon Park, Pune',
  distance: '1.2 km',
  status: 'available',
  donor: 'Green Café',
}

describe('DonationCard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-03-30T12:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the donation details', () => {
    render(<DonationCard donation={baseDonation} />)
    expect(screen.getByText('Veg Biryani Trays')).toBeInTheDocument()
    expect(screen.getByText('12 kg')).toBeInTheDocument()
    expect(screen.getByText('Koregaon Park, Pune')).toBeInTheDocument()
    expect(screen.getByText('Green Café')).toBeInTheDocument()
    expect(screen.getByText('1.2 km')).toBeInTheDocument()
    expect(screen.getByText('6h 0m left')).toBeInTheDocument()
  })

  it('links to the donation detail page', () => {
    render(<DonationCard donation={baseDonation} />)
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute('href', '/donation/7')
  })

  it('flags a donation that is about to expire', () => {
    render(<DonationCard donation={{ ...baseDonation, expiryTime: '2026-03-30T13:00:00Z' }} />)
    expect(screen.getByText(/expiring soon/i)).toBeInTheDocument()
  })

  it('shows the request button only for available donations when asked', () => {
    const { rerender } = render(<DonationCard donation={baseDonation} showRequest />)
    expect(screen.getByRole('button', { name: 'Request' })).toBeInTheDocument()

    rerender(<DonationCard donation={{ ...baseDonation, status: 'requested' }} showRequest />)
    expect(screen.queryByRole('button', { name: 'Request' })).not.toBeInTheDocument()
  })

  it('hides the request and action buttons by default', () => {
    render(<DonationCard donation={baseDonation} />)
    expect(screen.queryByRole('button', { name: 'Request' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '✏️' })).not.toBeInTheDocument()
  })
})
