import { defineStore } from 'pinia'
import type { HosPitalDtail } from '@/api/hospital/type'
import { reqHospitalDetail, reqHospitalDepartment } from '@/api/hospital/index'
import type {
  ResHosPitalDtail,
  ResHosDepartment,
  TotalDepartmentArr,
} from '@/api/hospital/type'
import { ref, reactive } from 'vue'
const useDetailStore = defineStore('Detail', () => {
  const hospitalInfo = reactive<HosPitalDtail>({} as HosPitalDtail)
  const departmentArr = reactive<TotalDepartmentArr>({} as TotalDepartmentArr)
  const getHospital = async (hoscode: string) => {
    const res: ResHosPitalDtail = await reqHospitalDetail(hoscode)
    if (res.code >= 200 && res.code < 300) {
      Object.assign(hospitalInfo, res.data)
    }
  }
  const getDepartment = async (hoscode: string) => {
    const res: ResHosDepartment = await reqHospitalDepartment(hoscode)
    if (res.code == 200) {
      Object.assign(departmentArr, res.data)
    }
  }
  return { getHospital, hospitalInfo, getDepartment, departmentArr }
})
export default useDetailStore
