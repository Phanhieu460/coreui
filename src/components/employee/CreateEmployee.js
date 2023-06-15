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
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api/apiClient'

const CreateEmployee = (props) => {
  const { visible, setVisible, fetchData } = props
  const [validated, setValidated] = useState(false)
  const [codeEmployee, setCodeEmployee] = useState()
  const [name, setName] = useState()
  const [age, setAge] = useState()

  const handleCreateEmployee = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      async function createEmployee() {
        const response = await api.post('/api/employee', {
          ma: codeEmployee,
          ten: name,
          tuoi: age,
        })
        if (response.id) {
          setVisible(false)
        }
        setCodeEmployee('')
        setAge('')
        setName('')
      }
      createEmployee()
      fetchData()
    }
    setValidated(true)
  }
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Create Employee</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm validated={validated} onSubmit={handleCreateEmployee}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-4 col-form-label">
                Mã Nhân Viên
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputName"
                  required
                  placeholder="Mã Nhân Viên"
                  feedbackInvalid="Please enter code in the input"
                  value={codeEmployee}
                  onChange={(e) => setCodeEmployee(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-4 col-form-label">
                Tên Nhân Viên
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputAddress"
                  required
                  placeholder="Tên Nhân Viên"
                  feedbackInvalid="Please enter name in the input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-4 col-form-label">
                Tuổi
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="number"
                  id="inputAge"
                  required
                  placeholder="Tuổi"
                  feedbackInvalid="Please enter age in the input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mt-2">
              <CCol className="d-flex justify-content-end">
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" className="ms-1" type="submit">
                  Create
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}

CreateEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}

export default CreateEmployee
