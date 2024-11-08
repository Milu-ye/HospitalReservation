//定义数据类型
export interface ResponseData {
  code: number
  message: string
  ok: string
}
export interface Hospital {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    hostypeString: string
    fullAddress: string
  }
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
  status: 0
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
}
export type Content = Hospital[]
export interface HospitalResponseData extends ResponseData {
  data: {
    content: Content
    pageable: {
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    first: boolean
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    numberOfElements: number
    size: number
    number: number
    empty: boolean
  }
}
//医院等级或地区数据
export interface HospitalLevelAndRegion {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: Object
  parentId: number
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[]
export interface HospitalLevelAndRegionData extends ResponseData {
  data: HospitalLevelAndRegionArr
}
export interface HospitalInfo extends ResponseData {
  data: Content
}
