import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { ThemeProvider, themeContext } from '../src/Context/themeContext'

// Mock de localStorage
const localStorageMock = (function () {
    let store = {}
    return {
        getItem(key) {
            return store[key] || null
        },
        setItem(key, value) {
            store[key] = value.toString()
        },
        clear() {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('ThemeProvider', () => {
    beforeEach(() => {
        // Avant chaque test, on nettoie le mock de localStorage
        window.localStorage.clear()
    })

    it('utilise le thème "light" comme valeur par défaut si rien n\'est défini dans localStorage', () => {
        render(
            <ThemeProvider>
                <themeContext.Consumer>
                    {(value) => (
                        <span>Current theme: {value.theme}</span>
                    )}
                </themeContext.Consumer>
            </ThemeProvider>,
        )
        expect(document.querySelector('span').textContent).toBe('Current theme: light')
    })

    it('change le thème de "light" à "dark" en utilisant toogleTheme', () => {
        let toogleTheme

        render(
            <ThemeProvider>
                <themeContext.Consumer>
                    {(value) => {
                        toogleTheme = value.toogleTheme
                        return <span>Current theme: {value.theme}</span>
                    }}
                </themeContext.Consumer>
            </ThemeProvider>,
        )

        act(() => {
            toogleTheme()
        })

        expect(document.querySelector('span').textContent).toBe('Current theme: dark')
    })

    it('initialise le thème avec la valeur stockée dans localStorage', () => {
        window.localStorage.setItem('theme', 'dark')
        render(
            <ThemeProvider>
                <themeContext.Consumer>
                    {(value) => (
                        <span>Current theme: {value.theme}</span>
                    )}
                </themeContext.Consumer>
            </ThemeProvider>,
        )
        expect(document.querySelector('span').textContent).toBe('Current theme: dark')
    })
})