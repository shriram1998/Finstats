import React from 'react'
import './menu.css'
import { ContextMenu, MenuItem } from "react-contextmenu";
const menu = (props) => {
    const Menu = props.data.map((val) => {
        return (<MenuItem>
            <i className={val.icon}></i>
            <span>{val.label}</span>
        </MenuItem>);
    });
    return (
        <>
            <ContextMenu id="contextmenu">
                { Menu}
            </ContextMenu>
        </>
    );
}

export default menu;