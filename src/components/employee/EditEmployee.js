import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'src/api/apiClient'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = (props) => {
  const [codeEmployee, setCodeEmployee] = useState()
  const [name, setName] = useState()
  const [age, setAge] = useState()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchById() {
      const res = await api.get(`/api/employee/${params.id}`)
      if (res) {
        setCodeEmployee(res.ma)
        setName(res.ten)
        setAge(res.tuoi)
      }
    }
    fetchById()
  }, [params.id])
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await api.put(`/api/employee/${params.id}`, {
      ma: codeEmployee,
      ten: name,
      tuoi: age,
    })
    if (response) {
      navigate('/employee')
    }
  }
  return (
    <div>
      <CForm onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputCode" className="col-sm-4 col-form-label">
            Mã Nhân Viên
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              id="inputCode"
              required
              placeholder="Mã Nhân Viên"
              value={codeEmployee}
              onChange={(e) => setCodeEmployee(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputName" className="col-sm-4 col-form-label">
            Tên Nhân Viên
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              id="inputName"
              required
              placeholder="Tên Nhân Viên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputAge" className="col-sm-4 col-form-label">
            Tuổi
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              id="inputAge"
              required
              placeholder="Tuổi"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-2">
          <CCol className="d-flex justify-content-end">
            <CButton color="secondary" onClick={() => navigate('/employee')}>
              Back
            </CButton>
            <CButton color="primary" className="ms-1" type="submit">
              Update
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}
EditEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}
export default EditEmployee
