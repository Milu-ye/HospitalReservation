import request from '@/utils/request'
import type { SubmitOrder } from './type'
enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder',
}
export const reqSubmitOrder = (
  hocode: string,
  scheduleId: string,
  patientId: number,
) =>
  request.post<any, SubmitOrder>(
    API.SUBMITORDER_URL + `/${hocode}/${scheduleId}/${patientId}`,
  )
