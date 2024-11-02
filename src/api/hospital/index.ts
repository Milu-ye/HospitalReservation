import request from '@/utils/request'
import type { ResHosPitalDtail, ResHosDepartment } from './type'
enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  HOSPITALDEPARtMENT_URL = '/hosp/hospital/department/',
}

export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, ResHosPitalDtail>(API.HOSPITALDETAIL_URL + hoscode)
export const reqHospitalDepartment = (hoscode: string) =>
  request.get<any, ResHosDepartment>(API.HOSPITALDEPARtMENT_URL + hoscode)
