declare module 'qcloud-cos-sts' {
  interface IOptions {
    secretId: string
    secretKey: string
    policy: {}
    durationSeconds?: number
    proxy?: string
    host?: string
  }
  interface IScope {
    action: string
    bucket: string
    region: string
    prefix: string
  }
  export function getCredential(
    options: IOptions,
    callback: (err: Error, credential: any) => void
  ): void
  export function getPolicy(scope: IScope[]): any
}