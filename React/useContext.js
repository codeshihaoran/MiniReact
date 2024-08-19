import useEffect from './useEffect'
import useState from './useState'
const useContext = (context) => {
    const [value, setValue] = useState(context._value)

    useEffect(() => {
        const updateValue = (newValue) => {
            setValue(newValue)
        }
        context._update = updateValue;
        return () => {
            context._update = null
        }
    }, [context])
    return value
}
export default useContext