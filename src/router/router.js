import { createElement } from "../index";
import useState from "../../React/useState";
import useEffect from "../../React/useEffect";
/** @jsx createElement */
const Router = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/");

    useEffect(() => {
        const onHashChange = () => setCurrentPath(window.location.hash.slice(1));

        window.addEventListener("hashchange", onHashChange);

        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);
    console.log(currentPath);
    return (
        <div>  {children.map(child => {
            console.log(child);
            if (child.props.path === currentPath) {
                return child
            }
            return null;
        })}</div>

    );
}
export default Router