import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transFormResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormUrl(config)
  config.headers = transFormHeaders(config)
  config.data = transFormRequestData(config)
}

function transFormUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transFormRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transFormHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transFormResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
