import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import { donations } from '@/lib/data'

describe('landing page', () => {
  it('renders the hero headline and calls to action', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Reduce Food Waste/i)
    expect(screen.getAllByRole('link', { name: /Donate Food/i }).length).toBeGreaterThan(0)
  })

  it('renders the FoodShare brand in the navbar', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/FoodShare/).length).toBeGreaterThan(0)
  })
})

describe('seed data', () => {
  it('ships donations with the fields the UI depends on', () => {
    expect(donations.length).toBeGreaterThan(0)
    for (const donation of donations) {
      expect(donation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          foodName: expect.any(String),
          status: expect.any(String),
          expiryTime: expect.any(String),
        })
      )
    }
  })
})
