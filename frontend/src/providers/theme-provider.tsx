import { useEffect } from 'react'
import { themeChange } from 'theme-change'

const ThemeProvider = ({children}:Readonly<{children : React.ReactNode}>) => {

useEffect(() => {
  themeChange(false)
}, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default ThemeProvider