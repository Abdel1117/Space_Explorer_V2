import { describe, it, expect, beforeEach, vi } from 'vitest'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock,
}))

import { render, screen, fireEvent } from '@testing-library/react'
import Footer from '../src/componants/Footer/Footer'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/Context/themeContext'

describe('Footer component', () => {
  beforeEach(() => {
    navigateMock.mockClear()
  })

  it('renders the main footer buttons and current year', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Footer />
        </ThemeProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: /Theme/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Space Explorer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Mentions légales/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Politique de confidentialité/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Nous contacter/i })).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument()
  })

  it('calls navigate with the expected path when buttons are clicked', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Footer />
        </ThemeProvider>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /Theme/i }))
    expect(navigateMock).toHaveBeenCalledWith('/')

    fireEvent.click(screen.getByRole('button', { name: /Mentions légales/i }))
    expect(navigateMock).toHaveBeenCalledWith('/mentions-legales')

    fireEvent.click(screen.getByRole('button', { name: /Politique de confidentialité/i }))
    expect(navigateMock).toHaveBeenCalledWith('/politique-confidentialite')

    fireEvent.click(screen.getByRole('button', { name: /Nous contacter/i }))
    expect(navigateMock).toHaveBeenCalledWith('/nous-contacter')
  })
})
