import { createElement } from "../src/index";
/** @jsx createElement */
const Route = ({ path, component }) => {
    return createElement(component)
}
export default Route
