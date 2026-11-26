import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/Button'

describe('Button', () => {
  it('renders its label as a button by default', () => {
    render(<Button>Donate Food</Button>)
    const button = screen.getByRole('button', { name: 'Donate Food' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders a link when an href is given', () => {
    render(<Button href="/auth">Find Food</Button>)
    const link = screen.getByRole('link', { name: 'Find Food' })
    expect(link).toHaveAttribute('href', '/auth')
  })

  it('applies the requested variant and size classes', () => {
    render(
      <Button variant="alert" size="lg">
        Urgent
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Urgent' })
    expect(button.className).toContain('bg-alert-500')
    expect(button.className).toContain('px-6')
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and not clickable when disabled is set', async () => {
    const onClick = jest.fn()
    render(
      <Button disabled onClick={onClick}>
        Request Pickup
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Request Pickup' })
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
