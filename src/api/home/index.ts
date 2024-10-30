import request from '@/utils/request'
import type {
  HospitalResponseData,
  HospitalLevelAndRegionData,
  HospitalInfo,
} from './type'
enum API {
  //获取已有医院接口地址
  HOSPITAL_URL = '/hosp/hospital',
  //获取医院等级与地区
  HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode',
  //根据医院关键字获取数据
  HOSPITALINFO_URL = '/hosp/hospital/findByHosname',
}
export const reqHospital = (
  page: number,
  limit: number,
  hostype: string = '',
  districtCode: string = '',
) =>
  request.get<any, HospitalResponseData>(
    API.HOSPITAL_URL + `/${page}/${limit}`,
    {
      params: {
        hostype,
        districtCode,
      },
    },
  )

//获取医院等级与地区
export const resHospitalLevelAndRegon = (dicCode: string) =>
  request.get<any, HospitalLevelAndRegionData>(
    API.HOSPITALLEVELANDREGION_URL + `/${dicCode}`,
  )
//关键字获取医院
export const reqHospitalInfo = (hosname: string) =>
  request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + `/${hosname}`)
