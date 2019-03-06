import moment from 'moment'
/**
 * 将一个对象转化成key=value形式，并且通过seperator分隔
 * @param obj
 * @param seperator
 */
export function objectToKeyValue(
  obj: {
    [key: string]: string | number
  },
  seperator: string = '&'
): string {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}='${obj[key]}'`).join(seperator)
}

/**
 * 通过指定键名，从目标对象上复制对应键值
 * @param keys 键名数组
 * @param obj 要复制对象
 */
export function copyValueFromObj(keys: string[], obj: any) {
  const newObj: any = {}
  keys.forEach(key => {
    if (key in obj) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export function timeFormat(time: string) {
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
}

/**
 * 返回随机字符
 * @param length 字符长度
 */
export function randomCharacter(length: number): string {
  const list = '0123456789abcdefghijklmnopqrstuvwxyz'
  let str: string = ''
  while (length > 0) {
    const randomIndex: number = Math.floor(Math.random() * 35)
    str += list[randomIndex]
    length--
  }
  return str
}
