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
import { ToastContainer, toast } from 'react-toastify'

const CreateEmployee = (props) => {
  const { visible, setVisible, fetchData } = props
  const [validated, setValidated] = useState(false)

  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [salary, setSalary] = useState()

  const handleCreateEmployee = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      async function createEmployee() {
        const response = await api.post('/api/employee', {
          name,
          address,
          salary,
        })
        if (response.id) {
          toast.success('Create Employee Successfully!', {
            position: 'top-right',
          })
          setVisible(false)
        }
      }
      createEmployee()
      setAddress('')
      setName('')
      setSalary('')
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
              <CFormLabel htmlFor="inputAddress" className="col-sm-4 col-form-label">
                Name
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputAddress"
                  required
                  placeholder="Name"
                  feedbackInvalid="Please enter name in the input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-4 col-form-label">
                Address
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputAddress"
                  required
                  placeholder="Address"
                  feedbackInvalid="Please enter address in the input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputSalary" className="col-sm-4 col-form-label">
                Salary
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  tooltipFeedback
                  type="text"
                  id="inputSalary"
                  required
                  placeholder="Salary"
                  feedbackInvalid="Please enter salary in the input"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
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
      <ToastContainer />
    </div>
  )
}

CreateEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}

export default CreateEmployee
