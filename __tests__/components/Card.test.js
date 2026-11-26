import { render, screen } from '@testing-library/react'
import Card, { StatCard } from '@/components/Card'

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <p>Fresh Vegetable Assortment</p>
      </Card>
    )
    expect(screen.getByText('Fresh Vegetable Assortment')).toBeInTheDocument()
  })

  it('merges custom classes with the defaults', () => {
    const { container } = render(<Card className="custom-grid" padding="p-2">Body</Card>)
    const card = container.firstChild
    expect(card.className).toContain('custom-grid')
    expect(card.className).toContain('p-2')
    expect(card.className).toContain('rounded-2xl')
  })
})

describe('StatCard', () => {
  it('shows the value, label and trend', () => {
    render(<StatCard icon="🍱" label="Meals saved" value="10,000" trend="+12%" />)
    expect(screen.getByText('10,000')).toBeInTheDocument()
    expect(screen.getByText('Meals saved')).toBeInTheDocument()
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('omits the trend badge when no trend is passed', () => {
    render(<StatCard icon="🍱" label="Active donations" value="24" />)
    expect(screen.queryByText('+12%')).not.toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
  })
})
