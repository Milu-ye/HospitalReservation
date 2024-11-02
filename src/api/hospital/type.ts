export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface BookingRule {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: string[]
}

export interface Hospital {
  id: string
  createTime: Date
  updateTime: Date
  isDeleted: number
  param: Param
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: null
  route: string
  status: number
  bookingRule: null
}

export interface Param {
  hostypeString: string
  fullAddress: string
}
export interface HosPitalDtail {
  bookingRule: BookingRule
  hospital: Hospital
}
export interface ResHosPitalDtail extends ResponseData {
  data: HosPitalDtail
}

export interface Department {
  depcode: string
  depname: string
  children: null
}
export type DepartmentArr = Department[]
export interface TotalDepartment {
  depcode: string
  depname: string
  children: DepartmentArr
}
export type TotalDepartmentArr = TotalDepartment[]
export interface ResHosDepartment extends ResponseData {
  data: TotalDepartmentArr
}
