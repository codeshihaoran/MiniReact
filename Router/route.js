import { MiniReact } from "../src/index";

/** @jsx MiniReact.createElement */
const Route = ({ path, component }) => {
    return MiniReact.createElement(component)
}
export default Route
