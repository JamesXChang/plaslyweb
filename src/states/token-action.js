export function tokenSet(target)
{
  return {
    type: '@TOKEN/SET',
    target: target
  }
}

export function tokenUnset()
{
  return {
    type: '@TOKEN/UNSET'
  }
}