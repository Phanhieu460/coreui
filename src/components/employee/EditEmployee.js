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
import { ToastContainer, toast } from 'react-toastify'

const EditEmployee = (props) => {
  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [salary, setSalary] = useState()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchById() {
      try {
        const res = await api.get(`/api/employee/${params.id}`)
        if (res) {
          setName(res.name)
          setAddress(res.address)
          setSalary(res.salary)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchById()
  }, [params.id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await api.put(`/api/employee/${params.id}`, {
        name,
        address,
        salary,
      })
      if (response) {
        toast.success('Edit Employee Successfully!', {
          position: 'top-right',
        })
        navigate('/employee')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return (
    <div className="employee">
      <h2 className="text-center">Edit Employee</h2>
      <CForm onSubmit={handleSubmit} className="p-2">
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
            <CButton color="secondary" onClick={() => navigate('/employee')}>
              Back
            </CButton>
            <CButton color="primary" className="ms-1" type="submit">
              Update
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      <ToastContainer />
    </div>
  )
}
EditEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}
export default EditEmployee
