import { Component, Fragment, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { ValueStatus } from "mendix";
import classNames from "classnames";
// import { FocusContainer } from "./helpers/FocusContainer";

import { Alert } from "./components/Alert";
import { RadioGroup, Radio } from "./components/RadioGroup";
import { RadioContainerContainerProps } from "../typings/RadioContainerProps";

import "./ui/RadioGroup.scss";

class RadioContainer extends Component<RadioContainerContainerProps> {
    onChange = this.onChangeHandler.bind(this);
    // onFocus = this.onFocusHandler.bind(this);
    // onBlur = this.onBlurHandler.bind(this);

    onChangeHandler(value: string) {
        const attribute = this.props.attribute;
        if (attribute.status === ValueStatus.Available && !attribute.readOnly) {
            attribute.setValue(value);
        }
    }

    // onFocusHandler() {
    //     const onEnterAction = this.props.onEnterAction;
    //     if (onEnterAction?.canExecute) {
    //         onEnterAction.execute();
    //     }
    // }

    // onBlurHandler() {
    //     const onLeaveAction = this.props.onLeaveAction;
    //     if (onLeaveAction?.canExecute) {
    //         onLeaveAction.execute();
    //     }
    // }

    render(): ReactNode {
        const { attribute, options, id, tabIndex, orientation } = this.props;
        return (
            <Fragment>
                <RadioGroup
                    id={id}
                    value={attribute.value}
                    onChange={this.onChange}
                    hasError={!!attribute.validation}
                    className={classNames(this.props.class, { inline : orientation === "horizontal" })}
                    style={this.props.style}
                >
                    {
                        options.map((option, index) => (
                            <Radio
                                value={option.value}
                                label={option.ariaLabel?.value}
                                disabled={attribute.readOnly}
                                tabIndex={tabIndex}
                                firstItem={index === 0}
                            >
                                {option.content}
                            </Radio>
                        )) as any
                    }
                </RadioGroup>
                <Alert id={`${id}-error`} validation={attribute.validation} />
            </Fragment>
        );
    }
}

export default hot(RadioContainer);
