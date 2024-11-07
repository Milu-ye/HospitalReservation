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
export type Code = string
export interface ResCode extends ResponseData {
  data: Code
}
export interface LoginData {
  phone: string
  code: string
}
export interface UserInfo {
  name: string
  token: string
  openid?: string
}
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}

export interface WxLogin {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

export interface WxLoginResponseData extends ResponseData {
  data: WxLogin
}
export interface HospitalWorkData {
  total: number
  bookingScheduleList: BookingScheduleList[]
  baseMap: BaseMap
}

export interface BookingScheduleList {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: number
  availableNumber: number
  status: number
}

export interface BaseMap {
  workDateString: string
  releaseTime: string
  bigname: string
  stopTime: string
  depname: string
  hosname: string
}

export interface ResHospitalWorkData extends ResponseData {
  data: HospitalWorkData
}
export interface Doctor {
  id: string
  createTime: Date
  updateTime: Date
  isDeleted: number
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  depcode: string
  title: string
  docname: string
  skill: string
  workDate: Date
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}
export interface DoctorResponseData extends ResponseData {
  data: Doctor[]
}
export interface User {
  id: number
  createTime: Date
  updateTime: Date
  isDeleted: number
  param: {
    certificatesTypeString: null
    contactsCertificatesTypeString: null
    cityString: null
    fullAddress: string
    districtString: null
    provinceString: null
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: Date
  phone: string
  isMarry: number
  provinceCode: null | string
  cityCode: null | string
  districtCode: null | string
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: number
  cardNo: null
  status: string
}
export interface UserResponseData extends ResponseData {
  data: User[]
}

export interface DoctorInfoData extends ResponseData {
  data: Doctor
}
