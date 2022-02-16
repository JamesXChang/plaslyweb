export function optionSet(options) {
    return {
        type: '@OPTION/SET',
        chosenOptions: options,
    }
}

export function optionUnset() {
    return {
        type: '@OPTION/UNSET'
    }
}