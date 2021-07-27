import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../shared/History';
import { ID_TO_TYPE } from '../shared/Constants';
import Menu from '../shared/contextmenu/menu';
import { ContextMenuTrigger } from "react-contextmenu";
const MenuData = [{ "label": "Edit", "icon": "edit outline icon" }, { "label": "Delete", "icon": "trash alternate outline icon" }];

const Assets = (props) => {
    const tableRef = React.createRef();
    useEffect(() => {
        window.$(tableRef.current).tablesort();
    }, []);
    const calc = () => {
        let data = {};
        if (props.assetOverview != null) {
            let tableData = props.assetOverview;
            let totalInvested = 0;
            let totalCurrent = 0;
            let tableJSX = Object.values(tableData).map((val) => {
                totalInvested += val.invested_amount;
                totalCurrent += val.current_amount;
                let returns = ((val.current_amount / val.invested_amount - 1) * 100).toFixed(2);
                return (
                    <tr className="row" key={val.asset_id}>
                        <td>{ID_TO_TYPE[val.asset_id]}</td>
                        <td>{val.asset_details}</td>
                        <td>{val.invested_amount}</td>
                        <td>{val.current_amount} </td>
                        <td className={`${returns >= 0 ? "profit" : "loss"}`}>{returns + "%"}</td>
                        <td>
                            <i className="edit outline icon" onClick={(e) => history.push(`/assets/edit/${e.target.parentNode.parentNode.id}`)} />
                            <i className="trash alternate outline icon" onClick={(e) => history.push(`/assets/delete/${e.target.parentNode.parentNode.id}`)} />
                        </td>
                        {/* <ContextMenuTrigger id="contextmenu">
                            <td className="editButton"><button className="ui icon tiny button"><i className="ellipsis horizontal icon"/></button></td>
                        </ContextMenuTrigger>
                        <Menu data={this.menuData}/> */}
                    </tr>
                );
            });
            data.totalCurrent = totalCurrent;
            data.totalInvested = totalInvested;
            data.totalReturns = ((totalCurrent / totalInvested - 1) * 100).toFixed(2);
            data.tableJSX = tableJSX;
            return data;
        }
    }
    const [data, setData] = useState(() => {
        if (props.assetOverview !== null) {
            return calc();
        }
        return null;
    });
    useEffect(() => {
        setData(calc());
    }, [props.assetOverview]);
    return (
        <div className="ui container">
            <div class="ui secondary pointing menu">
                <Link to="/" className="active item">Overview</Link>
                <Link to="/assets/create" className="item">Create Asset</Link>
            </div>
            <table ref={tableRef} id="assetTable" className="ui selectable sortable very basic table">
                <thead>
                    <tr>
                        <th>Asset type</th>
                        <th>Asset details</th>
                        <th>Invested amount</th>
                        <th>Current amount</th>
                        <th>Returns</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.tableJSX}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>{data.totalInvested}</th>
                        <th>{data.totalCurrent}</th>
                        <th className={`${data.totalReturns >= 0 ? "profit" : "loss"}`}>{data.totalReturns + "%"}</th>
                    </tr>
                </tfoot>
            </table>
        </div> 
    );
}

const mapStateToProps = (state) => {
    return { id:state.auth.user.id,assetOverview:state.asset.overview };
}
export default connect(mapStateToProps,{})(Assets);