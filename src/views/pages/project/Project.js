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
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { cilColorBorder, cilPlus, cilDelete, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CreateProject from 'src/components/project/CreateProject'
import EditProject from 'src/components/project/EditProject'
import api from 'src/api/apiClient'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Project = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [page, setPage] = useState(0)
  const [listProject, setListProject] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleClickPrevious = () => {
    if (page <= 0) {
      return
    }
    setPage(page - 1)
  }

  async function fetchData() {
    const response = await api.get(`/api/project?page=${page}`)
    setListProject(response.content)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    async function searchData() {
      const res = await api.get(`/api/project?search=${search}`)
      setListProject(res.content)
    }
    searchData()
  }, [search])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/project/${id}`)
      toast.success('Delete Project Successfully!', {
        position: 'top-right',
      })

      fetchData()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <div className="employee">
      {/* <CFormInput type="text" id="search" placeholder="Search by ..." /> */}
      <CRow className="d-flex justify-content-between p-2">
        <CCol span={6}>
          <CFormInput
            size="sm"
            type="text"
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
              STT
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Mã Dự Án
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Tên Dự Án
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Ngày Bắt Đầu
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Ngày Kết Thúc
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {listProject &&
            listProject.map((project, index) => {
              return (
                <CTableRow key={project.id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{project.ma}</CTableDataCell>
                  <CTableDataCell>{project.ten}</CTableDataCell>
                  <CTableDataCell>{project.ngayBatDau}</CTableDataCell>
                  <CTableDataCell>{project.ngayKeThuc}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      variant="ghost"
                      onClick={() => {
                        navigate(`/project/${project.id}`)
                      }}
                    >
                      <CIcon icon={cilColorBorder} />
                    </CButton>

                    <CButton variant="ghost" onClick={() => handleDelete(project.is)}>
                      <CIcon icon={cilDelete} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem id="previous-project" onClick={handleClickPrevious}>
          {' '}
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>{page + 1}</CPaginationItem>
        <CPaginationItem onClick={() => setPage(page + 1)}>
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
      {/* <CModal visible={isDelete} onClose={() => setIsDelete(false)}>
        <CModalHeader onClose={() => setIsDelete(false)}>
          <CModalTitle>Delete Project</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to delete this project?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsDelete(false)}>
            Close
          </CButton>
          <CButton color="primary">Delete</CButton>
        </CModalFooter>
      </CModal> */}
      <CreateProject visible={isCreate} setVisible={setIsCreate} fetchData={fetchData} />
      <ToastContainer />
    </div>
  )
}

export default Project
