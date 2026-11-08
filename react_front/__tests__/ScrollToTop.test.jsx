import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollToTop } from '../src/componants/ScrollToTop/ScrollToTop'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('ScrollToTop component', () => {
  const scrollToMock = vi.fn()
  const documentScrollToMock = vi.fn()
  
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(scrollToMock)
    vi.spyOn(document.documentElement, 'scrollTo').mockImplementation(documentScrollToMock)
  })

  it('calls scrollTo when the route changes', () => {
    render(
      <MemoryRouter initialEntries={['/start']}>
        <Routes>
          <Route path="/start" element={<ScrollToTop />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(scrollToMock).toHaveBeenCalledWith(0, 0)
    expect(documentScrollToMock).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })
  })
})
