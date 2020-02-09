import {
    forwardRef,
    useContext,
    useRef,
    useEffect,
    useState,
    createElement,
    useCallback,
    Children,
    useMemo,
    createContext,
    FocusEvent,
    ComponentType,
    CSSProperties
} from "react";

import { getValidationAriaProps } from "../helpers/aria-props";

const codes = {
    RETURN: 13,
    SPACE: 32,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

export interface RadioGroupCtx<V, Siblings = V[]> {
    value: V;
    otherRadioValues: Siblings;
    setChecked: (value: any) => void;
}

const RadioGroupContext = createContext<RadioGroupCtx<any>>({} as any);

export interface RadioProps<V> {
    value: V;
    label?: string;
    children: any;
    tabIndex: number;
    firstItem: boolean;
    disabled: boolean;
    onFocus?: (e: FocusEvent<any>) => void;
    onBlur?: (e: any) => void;
}

export interface RadioGroupProps<V> {
    id: string;
    className?: string;
    style?: CSSProperties;
    hasError: boolean;
    children: ComponentType<RadioProps<V>>[];
    value: V;
    onChange: (value: V) => void;
}

export function RadioGroup<V>({ id, hasError, children, value, ...props }: RadioGroupProps<V>) {
    const setChecked = useCallback(v => {
        if (props.onChange) {
            props.onChange(v);
        }
    }, []);

    const otherRadioValues = Children.map<any, any>(children, child => child.props.value);
    const ctx = useMemo(
        () => ({
            value,
            otherRadioValues,
            setChecked
        }),
        [otherRadioValues, value]
    );
    return (
        <RadioGroupContext.Provider value={ctx}>
            <div
                role="radiogroup"
                className={props.className}
                style={props.style}
                id={id}
                data-mendix-radio-group
                {...getValidationAriaProps(hasError, id)}
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
}

export const Radio = forwardRef<HTMLDivElement | null, RadioProps<any>>(
    ({ children, ...props }, maybeOuterRef: any) => {
        const [focus, setFocus] = useState(false);
        const ref = useRef<HTMLDivElement | null>(null);

        const ctx = useContext(RadioGroupContext);
        const { otherRadioValues, value, setChecked } = ctx;
        const index = otherRadioValues.findIndex(i => i == props.value);
        const count = otherRadioValues.length - 1;
        useEffect(() => {
            if (value === props.value) {
                if (maybeOuterRef && maybeOuterRef.current !== null) {
                    maybeOuterRef.current.focus();
                } else if (ref.current !== null) {
                    ref.current.focus();
                }
            }
        }, [value, props.value, maybeOuterRef]);

        const handleKeyDown = useCallback(
            event => {
                event.persist();
                var flag = false;
                function setPrevious() {
                    if (index === 0) {
                        setChecked(otherRadioValues[count]);
                    } else {
                        setChecked(otherRadioValues[index - 1]);
                    }
                }

                function setNext() {
                    if (index === count) {
                        setChecked(otherRadioValues[0]);
                    } else {
                        setChecked(otherRadioValues[index + 1]);
                    }
                }

                switch (event.keyCode) {
                    case codes.SPACE:
                    case codes.RETURN:
                        setChecked(props.value);
                        flag = true;
                        break;
                    case codes.UP:
                    case codes.LEFT:
                        setPrevious();
                        flag = true;
                        break;
                    case codes.DOWN:
                    case codes.RIGHT:
                        setNext();
                        flag = true;
                        break;
                    default:
                        break;
                }

                if (flag) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            },
            [children, otherRadioValues, props.value, count, index]
        );

        const handleClick = useCallback(() => {
            if (props.disabled) {
                return;
            }
            setChecked(props.value);
        }, [props.value, props.disabled]);

        const handleBlur = useCallback(
            e => {
                if (props.disabled) {
                    return;
                }
                if (props.onBlur) {
                    props.onBlur(e);
                }
                setFocus(false);
            },
            [props.disabled]
        );

        const handleFocus = useCallback(
            e => {
                if (props.disabled) {
                    return;
                }
                if (props.onFocus) {
                    props.onFocus(e);
                }
                setFocus(true);
            },
            [props.disabled]
        );
        const tabIndex = (value === props.value || (value === undefined && props.firstItem)) && !props.disabled ? props.tabIndex || 0 : -1;
        return (
            <div
                {...props}
                role="radio"
                tabIndex={tabIndex}
                aria-checked={value === props.value}
                aria-disabled={props.disabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                data-mendix-radio
                data-mendix-radio-focus={focus}
                aria-label={props.label}
                ref={el => {
                    if (maybeOuterRef) {
                        maybeOuterRef.current = el;
                    }
                    ref.current = el;
                }}
            >
                <div data-radio-input
                data-mendix-radio-focus={focus}
                aria-checked={value === props.value}
                aria-disabled={props.disabled}
                />
                {children}
            </div>
        );
    }
);
