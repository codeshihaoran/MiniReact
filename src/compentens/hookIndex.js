let hookIndex = 0

function initialIndex() {
    hookIndex = 0
}

function getHookIndex() {
    return hookIndex
}

function addHookIndex() {
    hookIndex++
}

export { hookIndex, getHookIndex, addHookIndex, initialIndex }