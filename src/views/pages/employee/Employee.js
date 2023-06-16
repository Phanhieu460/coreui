import CIcon from '@coreui/icons-react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
  CFormSelect,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { cilColorBorder, cilPlus, cilDelete, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CreateEmployee from 'src/components/employee/CreateEmployee'
import api from 'src/api/apiClient'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Navigation from 'src/components/pagination/Navigation'

const Employee = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [page, setPage] = useState(0)
  const [listEmployee, setListEmployee] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  async function fetchData() {
    try {
      const response = await api.get(`/api/employee?page=${page}`)
      setListEmployee(response.content)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    async function searchData() {
      try {
        const res = await api.get(`/api/employee?search=${search}`)
        setListEmployee(res.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    searchData()
  }, [search])

  const handleClickPrevious = () => {
    if (page <= 0) {
      return
    }
    setPage(page - 1)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/employee/${id}`)
      toast.success('Delete Employee Successfully!', {
        position: 'top-right',
      })

      fetchData()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <div className="employee">
      <CRow className="d-flex justify-content-between p-2">
        <CCol span={6}>
          <CFormInput
            size="sm"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by..."
          />
        </CCol>
        <CCol span={6} className="d-flex justify-content-end">
          <CButton color="success" onClick={() => setIsCreate(!isCreate)}>
            <CIcon icon={cilPlus} /> Create
          </CButton>
        </CCol>
      </CRow>
      <CTable className="text-center" responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-5">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Address
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Salary
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Project
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {listEmployee &&
            listEmployee.map((employee, index) => {
              return (
                <CTableRow key={employee.id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{employee.name}</CTableDataCell>
                  <CTableDataCell>{employee.address}</CTableDataCell>
                  <CTableDataCell>{employee.salary}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      variant="ghost"
                      onClick={() => {
                        navigate(`/employee/${employee.id}`)
                      }}
                    >
                      <CIcon icon={cilColorBorder} />
                    </CButton>
                    <CButton variant="ghost" onClick={() => handleDelete(employee.id)}>
                      <CIcon icon={cilDelete} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      {/* <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem onClick={handleClickPrevious}>
          {' '}
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>{page + 1}</CPaginationItem>
        <CPaginationItem onClick={() => setPage(page + 1)}>
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination> */}
      <Navigation total={listEmployee.length} setPage={setPage} page={page} />

      <CreateEmployee visible={isCreate} setVisible={setIsCreate} fetchData={fetchData} />
      <ToastContainer />
    </div>
  )
}

export default Employee
