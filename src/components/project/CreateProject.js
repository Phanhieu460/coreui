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
import api from 'src/api/apiClient'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const CreateProject = (props) => {
  const { visible, setVisible, fetchData } = props
  const [name, setName] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  const handleCreateProject = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      async function createProject() {
        const response = await api.post('/api/project', {
          name,
          startDate,
          endDate,
        })
        if (response.id) {
          toast.success('Create Project Successfully!', {
            position: 'top-right',
          })
          setVisible(false)
        }
      }
      createProject()
      setStartDate('')
      setEndDate('')
      setName('')
      fetchData()
    }
    setValidated(true)
  }
  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Create Project</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm validated={validated} onSubmit={handleCreateProject}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-4 col-form-label">
                Name Project
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  id="inputName"
                  required
                  placeholder="Tên Dự Án"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputStartDate" className="col-sm-4 col-form-label">
                Start Date
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="date"
                  id="inputStartDate"
                  required
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEndDate" className="col-sm-4 col-form-label">
                End Date
                <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="date"
                  id="inputEndDate"
                  required
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mt-2">
              <CCol className="d-flex justify-content-end">
                <CButton color="secondary" onClick={() => navigate('/project')}>
                  Close
                </CButton>
                <CButton color="primary" className="ms-1" type="submit">
                  Update
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

CreateProject.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.any,
}

export default CreateProject
