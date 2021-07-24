import React from 'react';
import { connect } from 'react-redux';
import { fetchAllData } from './AssetAction';
import { Link } from 'react-router-dom';
import history from '../shared/History';
import Menu from '../shared/contextmenu/menu';
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
        if (this.props.id!=null) {
            this.props.fetchAllData(this.props.id);
            console.log("Data fetched");
            // this.calc();
        }
        window.$(this.tableRef.current).tablesort();
    }
    calc() {
        if (this.props.assetOverview != null) {
            let instruments = this.props.assetOverview['instruments'];
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
    return { id:state.auth.user.id,assetOverview:state.assetOverview };
}
export default connect(mapStateToProps,{fetchAllData})(Assets);