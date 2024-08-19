import { createElement } from "../index";
/** @jsx createElement */
const Route = ({ path, component }) => {
    let pathName = window.location.pathname
    if (pathName.match(path)) {
        return createElement(component)
    }
}
export default Route