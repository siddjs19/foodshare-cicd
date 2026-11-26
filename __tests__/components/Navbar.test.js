import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('shows the login and get-started links for guests', () => {
    render(<Navbar />)
    expect(screen.getAllByRole('link', { name: /log in/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /get started/i }).length).toBeGreaterThan(0)
  })

  it('opens and closes the mobile menu when the hamburger is clicked', async () => {
    render(<Navbar />)
    // only the desktop nav is visible before the menu is opened
    expect(screen.getAllByText('How it Works')).toHaveLength(1)

    await userEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
    expect(screen.getAllByText('How it Works')).toHaveLength(2)

    await userEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
    expect(screen.getAllByText('How it Works')).toHaveLength(1)
  })

  it('shows donor navigation for a logged-in donor', async () => {
    render(<Navbar role="donor" />)
    await userEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
    expect(screen.getAllByText('Donate Food')).toHaveLength(2)
  })

  it('shows only the dashboard entry for an NGO', async () => {
    render(<Navbar role="ngo" />)
    await userEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
    expect(screen.getAllByText('Dashboard')).toHaveLength(2)
    expect(screen.queryByText('Donate Food')).not.toBeInTheDocument()
  })
})
