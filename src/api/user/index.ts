import request from '@/utils/request'
import type {
  QrCode,
  SubmitOrder,
  OrderResponseData,
  PayResult,
  UserinfoResponse,
  UserOrderInfoResponseData,
  AllOrderStateresponseData,
  AllUserResponseData,
} from './type'
import exp from 'constants'
enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder',
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  QRCODE_URL = '/order/weixin/createNative/',
  PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  USERINFO_URL = '/user/auth/getUserInfo',
  USERORDERINFO_URL = '/order/orderInfo/auth',
  ALLUSER_URL = '/user/patient/auth/findAll',
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
}
export const reqSubmitOrder = (
  hocode: string,
  scheduleId: string,
  patientId: number,
) =>
  request.post<any, SubmitOrder>(
    API.SUBMITORDER_URL + `/${hocode}/${scheduleId}/${patientId}`,
  )
export const reqOrderInfo = (id: string) =>
  request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)
export const reqCancelOrder = (id: string) =>
  request.get(API.ORDERCANCEL_URL + id)
export const reqQrcode = (orderId: string) =>
  request.get<any, QrCode>(API.QRCODE_URL + orderId)
export const reqQueryPayState = (orderId: string) =>
  request.get<any, PayResult>(API.PAYRESULT_URL + orderId)
export const reqUserInfo = () =>
  request.get<any, UserinfoResponse>(API.USERINFO_URL)
export const reqUserOrderInfo = (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string,
) =>
  request.get<any, UserOrderInfoResponseData>(
    API.USERORDERINFO_URL + `/${page}/${limit}`,
    {
      params: {
        patientId,
        orderStatus,
      },
    },
  )
export const reqAllUser = () =>
  request.get<any, AllUserResponseData>(API.ALLUSER_URL)
export const reqOrderState = () =>
  request.get<any, AllOrderStateresponseData>(API.ORDERSTATE_URL)
