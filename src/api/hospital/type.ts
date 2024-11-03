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
