const Switch = ({ children }) => {
    const last = children.length - 1
    let pathName = window.location.pathname
    const match = children.find(child => {
        return child.props.path === pathName;
    });
    if (!match) {
        return children[last]
    }

    return match;
}
export default Switch