import './details.css'
import Detail from '../../compentens/detail';
import { createElement } from '../../index'
import mdPathOne from '../../../docs/jsx.md'
import mdPathTwo from '../../../docs/fiber.md'
import mdPathThr from '../../../docs/hooks.md'

/** @jsx createElement */
const Details = () => {

    return (
        <div>
            <Detail
                mdPath={mdPathOne}
            />
            <Detail
                mdPath={mdPathTwo}
            />
            <Detail
                mdPath={mdPathThr}
            />
        </div>
    );
}
export default Details