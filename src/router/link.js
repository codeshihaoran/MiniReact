import { createElement } from "../index";
/** @jsx createElement */
function Link({ to, children }) {
    console.log(to);
    console.log(children[0].props.nodeValue);
    const handleClick = (e) => {
        window.location.hash = to;
    }
    return (
        <a
            href={to}
            onClick={handleClick}
        >{children[0].props.nodeValue}</a>
    )
}
export default Link