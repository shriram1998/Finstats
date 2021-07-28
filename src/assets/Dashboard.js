import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from './AssetAction';
import Pie from '../shared/charts/Doughnut';
import Line from '../shared/charts/Line';
import { MONTHS, LIQUIDITY } from '../shared/Constants';
import { ID_TO_TYPE } from '../shared/Constants';

const parseDate=(date)=>{
    let temp = new Date(date);
    temp = temp.getFullYear() + "-" + ('0' + (temp.getMonth() + 1)).slice(-2);
    return temp;
}
const Dashboard = (props) => {
    const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    const calc= ()=> {
        let instruments = props.assetOverview;
        let history = props.history;
        let maxLen = 0;
        let currVal = 0; let inv = 0; let ret = 0; let pieData = []; let allocLegend = []; let lineDataTemp = [];
        let lineData = []; let liquidData = []; let liquidLegend = [];
        let result = {};
        let liquidTemp = { "Liquid": 0, "Near Liquid": 0, "Illiquid": 0 };
        Object.values(instruments).map((v) => {
            currVal = currVal + v.current_amount
            inv = inv + v.invested_amount;
            let type=ID_TO_TYPE[v.asset_id];
            pieData.push({ "label": type, "value": v.current_amount });
            liquidTemp[LIQUIDITY[v.asset_id]] += parseInt(v.current_amount);
            // lineDataTemp.push(...v.hist);
            if (type.length > maxLen) { maxLen = type.length };
            return null;
        });
        ret = ((currVal / inv - 1) * 100).toFixed(2);

        //Allocation pie chart
        allocLegend.push(pieData.map((v) =>  v['label'] + ':' + (100 * v['value'] / currVal).toFixed(2) + '%' + '\xa0'.repeat(maxLen - v['label'].length)));
        //Liquidity pie chart
        Object.entries(liquidTemp).map(([k, v]) => {
            liquidData.push({ "label": k, "value": v });
            let temp=k + ':' + (100 * v / currVal).toFixed(2) + '%'+'\xa0'.repeat(maxLen - k.length);
            liquidLegend.push(temp);
            return null;
        });

        //Line chart computations
        lineDataTemp = Object.values(history).sort(function (a, b) { var x = new Date(a['date']); var y = new Date(b['date']); return (x - y); });
        let lineCurrTemp = {};
        let temp = parseDate(lineDataTemp[0]['date']);
        let currSum;
        Object.entries(groupBy(lineDataTemp, 'date')).map(([k, v]) => {
            k = parseDate(k);
            // console.log(temp.slice(-2),k.slice(-2),temp.substr(0, 4),k.substr(0, 4));
            while ((temp.slice(-2) !== k.slice(-2)) || (temp.substr(0, 4) !== k.substr(0, 4))) {
                var m = parseInt(temp.slice(-2)) % 12 + 1;
                var y;
                if (m === 1) { y = parseInt(temp.substr(0,4)) + 1 }
                else { y = temp.substr(0,4) }
                temp = y.toString() + '-' + ('0' + m.toString()).slice(-2);
                if ((temp.slice(-2) !== k.slice(-2))|| (temp.substr(0,4)!== k.substr(0,4))) {
                    lineData.push({ 'Date': MONTHS[m-1]+"'"+y.toString().slice(-2), 'Investment': currSum, ...lineCurrTemp });
                }
            }
            
            v.map((val)=>{
                let keyObj=val['asset_id'];
                lineCurrTemp[keyObj] = val['invested_amount'];
                return null;
            });
            currSum = Object.values(lineCurrTemp).reduce((a, b) => a + b);
            lineData.push({ 'Date': MONTHS[parseInt(k.slice(-2))-1]+"'"+k.substr(2,2), 'Investment': currSum, ...lineCurrTemp });
            return null;
        });
        let today = parseDate(new Date());
        while (new Date() > new Date(temp)) {
            // console.log(temp.slice(-2),today.slice(-2),temp.substr(0, 4),today.substr(0, 4));
            var m = parseInt(temp.slice(-2)) % 12 + 1;
            var y;
            if (m === 1) { y = parseInt(temp.substr(0,4)) + 1 }
            else { y = temp.substr(0,4) }
            temp = y.toString() + '-' + ('0' + m.toString()).slice(-2);
            if ((temp.slice(-2) !== today.slice(-2))|| (temp.substr(0,4)!== today.substr(0,4))) {
                lineData.push({ 'Date': MONTHS[m-1]+"'"+y.toString().slice(-2), 'Investment': currSum, ...lineCurrTemp });
            }
        }
        if (lineData.length > 12) {
            var offset = parseInt(lineData.length / 12)+1;
            lineData = lineData.map((x, i) => i % offset && i !== lineData.length - 1 ? null : x).filter(x => x !== null);
        }
        let dateTemp=[];let currValTemp=[];
        lineData.map((data)=>{
            dateTemp.push(data['Date']);
            currValTemp.push(data['Investment']);
            return null;
        });
        // console.log(dateTemp, currValTemp);
        result.currVal = currVal; result.inv = inv; result.ret = ret;
        result.pieData = pieData;result.liquidData = liquidData;result.lineData = lineData;
        result.allocLegend = allocLegend[0]; result.liquidLegend = liquidLegend;
        result.lineLabel = dateTemp; result.lineVal = currValTemp; 
        return result;
    }
    let initialData;
    const [data, setData] = useState(() => {
        if (props.assetOverview !== null) {
            initialData = calc();
            return initialData;
        }
        return null;
    });
    return (
        <div className="ui container defaultContainer dashboardClass mt">
            <div id="overviewDisp" className="ui stackable grid">
                <div className="dividerSegment">
                    <h2 className="ui horizontal divider header">
                        <i className="chart pie icon"></i>
                        Overview
                    </h2>
                </div>
                <div className="row dashboardFirstRow">
                    <div className="six wide column dashboardDetails">
                        <div className="ui grid dashGrid">
                            <div className="row">
                                <div className="eight wide column">
                                    <p className="label dashLabel">Investment</p>
                                    <span className="dashValue">{data?data.inv.toLocaleString():""} </span>
                                </div>
                                <div className="eight wide column">
                                    <p className="label dashLabel">Current value</p>
                                    <span className="dashValue">{data ? data.currVal.toLocaleString() : ""} </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="sixteen wide column">
                                    <p className="label dashLabel">Absolute returns </p>
                                    <span className={`${data.ret >= 0 ? "profit" : "loss"} dashValue`}>{data ? data.ret + "%" : "" + '%'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="five wide column">
                        <Pie data={data?data.pieData:[]} title={"Allocation"} legend={data?data.allocLegend:[]}/>
                    </div>
                    <div className="five wide column">
                        <Pie data={data?data.liquidData:[]} title={"Liquidity distribution"} legend={data?data.liquidLegend:[]}/>
                    </div>
                </div>
                <div className="row">
                    <div className="dividerSegment">
                        <h2 className="ui horizontal divider header">
                            <i className="chart bar icon"></i>
                            Account history
                        </h2>
                    </div>
                    <div className="chartClass">
                        <Line label={data.lineLabel} value={data.lineVal} data={ data.lineData} />
                    </div>
                </div>
            </div>
        </div>
        );
    }

const mapStateToProps = (state) => {
    return { assetOverview:state.asset.overview,user:state.auth.user,history:state.asset.history};
}
export default connect(mapStateToProps,{})(Dashboard);