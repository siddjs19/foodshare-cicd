import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input, { Select, Textarea } from '@/components/Input'

describe('Input', () => {
  it('renders a labelled field and marks it required', () => {
    render(<Input id="foodName" label="Food name" required />)
    const field = screen.getByLabelText(/Food name/i)
    expect(field).toBeInTheDocument()
    expect(field).toBeRequired()
  })

  it('shows the hint until there is an error', () => {
    const { rerender } = render(<Input id="qty" label="Quantity" hint="In kilograms" />)
    expect(screen.getByText('In kilograms')).toBeInTheDocument()

    rerender(<Input id="qty" label="Quantity" hint="In kilograms" error="Quantity is required" />)
    expect(screen.queryByText('In kilograms')).not.toBeInTheDocument()
    expect(screen.getByText('Quantity is required')).toBeInTheDocument()
  })

  it('reports typed values through onChange', async () => {
    const onChange = jest.fn()
    render(<Input id="pickup" label="Pickup point" onChange={onChange} />)
    await userEvent.type(screen.getByLabelText(/Pickup point/i), 'Baner')
    // one change event per typed character
    expect(onChange).toHaveBeenCalledTimes(5)
  })
})

describe('Select', () => {
  it('renders the placeholder and the supplied options', () => {
    render(
      <Select
        id="category"
        label="Category"
        placeholder="Choose a category"
        options={[{ value: 'veg', label: 'Vegetables' }, 'Bakery']}
      />
    )
    expect(screen.getByRole('option', { name: 'Choose a category' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Vegetables' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Bakery' })).toBeInTheDocument()
  })
})

describe('Textarea', () => {
  it('renders a labelled textarea with the requested row count', () => {
    render(<Textarea id="notes" label="Notes" rows={6} />)
    const field = screen.getByLabelText(/Notes/i)
    expect(field.tagName).toBe('TEXTAREA')
    expect(field).toHaveAttribute('rows', '6')
  })
})
