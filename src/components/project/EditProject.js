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
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'src/api/apiClient'
import moment from 'moment/moment'
import { ToastContainer, toast } from 'react-toastify'

const EditProject = () => {
  const [codeProject, setCodeProject] = useState()
  const [name, setName] = useState()
  const [startDate, setStartDate] = useState('2022-12-20')
  const [endDate, setEndDate] = useState()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchById() {
      try {
        const res = await api.get(`/api/project/${params.id}`)
        if (res) {
          setName(res.name)
          setStartDate(res.startDate)
          setEndDate(res.endDate)
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
      const response = await api.put(`/api/project/${params.id}`, {
        name,
        startDate,
        endDate,
      })
      if (response) {
        toast.success('Edit Project Successfully!', {
          position: 'top-right',
        })
        navigate('/project')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="employee">
      <h2 className="text-center">Edit Project</h2>
      <CForm onSubmit={handleSubmit} className="p-2">
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputName" className="col-sm-3 col-form-label">
            Name Project
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
              id="inputName"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputStartDate" className="col-sm-3 col-form-label">
            Start Date
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={9}>
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
          <CFormLabel htmlFor="inputEndDate" className="col-sm-3 col-form-label">
            End Date
            <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CCol sm={9}>
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

export default EditProject
