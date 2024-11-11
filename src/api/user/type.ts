import exp from 'constants'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SubmitOrder extends ResponseData {
  data: number
}
export interface OrderInfo {
  id: number
  createTime: Date
  updateTime: Date
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: string
  title: string
  reserveDate: Date
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}
export interface PayInfo {
  codeUrl: string
  orderId: number
  totalFee: number
  resultCode: string
}
export interface QrCode extends ResponseData {
  data: PayInfo
}
export interface PayResult extends ResponseData {
  data: boolean
}
export interface Userinfo {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {}
  openid: string
  nickName: string
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: string
  authStatus: number
  status: number
}
export interface UserinfoResponse extends ResponseData {
  data: Userinfo
}
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: OrderInfo[]
    total: number
    size: number
    current: number
    orders: any[]
    hitCount: boolean
    searchCount: boolean
    pages: number
  }
}
export interface User {
  id: number
  createTime: Date
  updateTime: Date
  isDeleted: number
  param: {
    certificatesTypeString: string
    contactsCertificatesTypeString: string
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
export interface AllUserResponseData extends ResponseData {
  data: User[]
}
export interface OrderState {
  comment: string
  status: number
}
export interface AllOrderStateresponseData extends ResponseData {
  data: OrderState[]
}
