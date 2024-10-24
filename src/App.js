import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'  // Import toast và ToastContainer
import 'react-toastify/dist/ReactToastify.css'          // Import CSS của react-toastify
import './scss/style.scss'

// Lazy load the containers and pages
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    
    if (theme) {
      setColorMode(theme)
      toast.success(`Theme set to ${theme}`)  // Thông báo toast khi thay đổi chủ đề qua URL
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme)
      toast.success(`Theme set to ${storedTheme}`)  // Thông báo toast khi thiết lập chủ đề từ lưu trữ
    }
  }, [isColorModeSet, setColorMode, storedTheme]) // Add dependencies for better useEffect management

  return (
    <HashRouter>
      <ToastContainer /> {/* Thêm ToastContainer vào để hiển thị toast */}
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
