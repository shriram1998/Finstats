import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from './AssetAction';
import { Link } from 'react-router-dom';
import history from '../app/shared/history';
import Menu from '../app/shared/contextmenu/menu';
import { ContextMenuTrigger } from "react-contextmenu";
class Assets extends React.Component{
    state = { "showMenuId": null };
    constructor(props) {
        super(props);
        this.assetData = [];
        this.currVal = 0;
        this.inv = 0;
        this.ret = 0;
        this.tableRef = React.createRef();
        this.menuData = [{ "label": "Edit", "icon": "edit outline icon" }, { "label": "Delete", "icon": "trash alternate outline icon" }];
    }
    componentDidMount() {
        if (this.props.userId!=null) {
            this.props.fetchData(this.props.userId);
            this.calc();
        }
        window.$(this.tableRef.current).tablesort();
    }
    calc() {
        if (this.props.userData != null) {
            let instruments = this.props.userData['instruments'];
            this.tableData=Object.entries(instruments).map(([k, v]) => {
                this.currVal = this.currVal + v.hist[0].value;
                this.inv = this.inv + v.hist[0].investment;
                var ret = ((v.hist[0].value / v.hist[0].investment - 1) * 100).toFixed(2);
                return (
                    <tr className="row" id={k}>
                        <td>{v.type}</td>
                        <td>{v.location}</td>
                        <td>{v.hist[0].investment}</td>
                        <td>{v.hist[0].value} </td>
                        <td className={`${ret >= 0 ? "profit" : "loss"}`}>{ret + "%"}</td>
                        <td>
                            <i className="edit outline icon" onClick={(e)=>history.push(`/assets/edit/${e.target.parentNode.parentNode.id}`) }/>
                            <i className="trash alternate outline icon" onClick={(e)=>history.push(`/assets/delete/${e.target.parentNode.parentNode.id}`) }/>
                        </td>
                        {/* <ContextMenuTrigger id="contextmenu">
                            <td className="editButton"><button className="ui icon tiny button"><i className="ellipsis horizontal icon"/></button></td>
                        </ContextMenuTrigger>
                        <Menu data={this.menuData}/> */}
                    </tr>);
            });
            this.ret = ((this.currVal / this.inv - 1) * 100).toFixed(2);
        }
    }
    render() {
        return (
            <>
            <div class="ui secondary pointing menu">
                <Link to="/" className="active item">Overview</Link>
                <Link to="/assets/create" className="item">Create Asset</Link>
            </div>
            <table ref={ this.tableRef} id="assetTable" className="ui selectable sortable very basic table">
                <thead>
                    <tr>
                        <th>Asset type</th>
                        <th>Location</th>
                        <th>Investment</th>
                        <th>Current value</th>
                        <th>Returns</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.tableData}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>{this.inv}</th>
                        <th>{this.currVal}</th>
                        <th className={`${this.ret >= 0 ? "profit" : "loss"}`}>{this.ret + "%"}</th>
                    </tr>
                </tfoot>
                </table>
            </>

    );
    }
}
const mapStateToProps = (state) => {
    return { userData:state.userData[state.auth.userId],userId:state.auth.userId,userName:state.auth.userName };
}
export default connect(mapStateToProps,{fetchData})(Assets);