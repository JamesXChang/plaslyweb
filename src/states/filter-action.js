export function filterSet(cond, name) {
    return {
        type: '@FILTER/SET',
        cond: cond,
        name: name,
    }
}

export function filterUnset() {
    return {
        type: '@FILTER/UNSET'
    }
}