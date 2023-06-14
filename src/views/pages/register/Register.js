import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Register = () => {
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    console.log(event.target)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      Cookies.set('authToken', 'ddfdfd')
      navigate('/dashboard')
    }
    setValidated(true)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput required placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput required placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CButton color="primary" type="submit" className="px-4 mx-auto">
                          Register
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign In</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3 " active tabIndex={-1}>
                        Login Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
