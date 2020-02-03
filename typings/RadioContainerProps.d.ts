/**
 * This file was generated from RadioContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface OptionsType {
    value?: string;
    content: ReactNode;
}

export interface OptionsVisibilityType {
    value: boolean;
    content: boolean;
}

export interface RadioContainerContainerProps extends CommonProps {
    options: OptionsType[];
    attribute: EditableValue<string>;
    onChangeAction?: ActionValue;
}

export interface RadioContainerPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    options: OptionsType[];
    attribute: string;
    onChangeAction?: ActionPreview;
}

export interface VisibilityMap {
    options: OptionsVisibilityType[] | boolean;
    attribute: boolean;
    onChangeAction: boolean;
}
