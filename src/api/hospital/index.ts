import request from '@/utils/request'
import type {
  ResHosPitalDtail,
  ResHosDepartment,
  ResCode,
  LoginData,
  UserLoginResponseData,
  WxLoginResponseData,
} from './type'
enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  HOSPITALDEPARtMENT_URL = '/hosp/hospital/department/',
  GETUSERCODE_URL = '/sms/send/',
  USERLOGIN_URL = '/user/login',
  WXLOGIN_URL = '/user/weixin/getLoginParam',
}

export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, ResHosPitalDtail>(API.HOSPITALDETAIL_URL + hoscode)
export const reqHospitalDepartment = (hoscode: string) =>
  request.get<any, ResHosDepartment>(API.HOSPITALDEPARtMENT_URL + hoscode)
export const reqCode = (phone: string) =>
  request.get<any, ResCode>(API.GETUSERCODE_URL + phone)
export const reqUserLogin = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WxLoginResponseData>(API.WXLOGIN_URL, {
    params: {
      wxRedirectUri,
    },
  })
