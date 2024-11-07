export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SubmitOrder extends ResponseData {
  data: number
}
