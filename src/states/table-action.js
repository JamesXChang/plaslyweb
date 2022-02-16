export function tableSet(header, data)
{
  return {
    type: '@TABLE/SET',
    header: header,
    data: data
  }
}

export function tableUnset()
{
  return {
    type: '@TABLE/UNSET'
  }
}