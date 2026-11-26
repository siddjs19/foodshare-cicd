import { getTimeRemaining, getStatusColor, formatDate } from '@/lib/utils'

describe('getTimeRemaining', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-03-30T12:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('flags food whose expiry time has already passed', () => {
    const result = getTimeRemaining('2026-03-30T10:00:00Z')
    expect(result).toEqual({ text: 'Expired', urgent: true, expired: true })
  })

  it('marks a donation expiring in under two hours as urgent', () => {
    const result = getTimeRemaining('2026-03-30T13:30:00Z')
    expect(result.text).toBe('1h 30m left')
    expect(result.urgent).toBe(true)
    expect(result.expired).toBe(false)
  })

  it('does not mark a donation expiring later the same day as urgent', () => {
    const result = getTimeRemaining('2026-03-30T17:00:00Z')
    expect(result.text).toBe('5h 0m left')
    expect(result.urgent).toBe(false)
  })

  it('reports multi-day windows as days and hours', () => {
    const result = getTimeRemaining('2026-04-01T17:00:00Z')
    expect(result.text).toBe('2d 5h left')
    expect(result.urgent).toBe(false)
  })
})

describe('getStatusColor', () => {
  it('returns the available badge classes', () => {
    expect(getStatusColor('available')).toBe('bg-primary-100 text-primary-700')
  })

  it('returns the requested badge classes', () => {
    expect(getStatusColor('requested')).toBe('bg-alert-100 text-alert-600')
  })

  it('falls back to neutral classes for unknown statuses', () => {
    expect(getStatusColor('cancelled')).toBe('bg-gray-100 text-gray-600')
    expect(getStatusColor(undefined)).toBe('bg-gray-100 text-gray-600')
  })
})

describe('formatDate', () => {
  it('formats an ISO date for Indian readers', () => {
    const formatted = formatDate('2026-03-30T18:00:00Z')
    expect(typeof formatted).toBe('string')
    expect(formatted).toContain('2026')
    expect(formatted).toMatch(/Mar/i)
  })
})
