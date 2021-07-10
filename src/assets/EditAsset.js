import React from 'react';
import { connect } from 'react-redux';
import { editData } from './AssetAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
import { Link } from 'react-router-dom';
const schema = z.object({
    Location: z.string().nonempty(),
    Investment: z.number().positive({ message: "Positivity, please?" }),
    InvestmentDate:z.date(),
    CurrentValue: z.number().positive({ message: "Positivity, please?" }),
    Type: z.string().nonempty({ message: "Please select a type" } )
});
// [{"MF":0},{"EQ":0},{"FD":0},{"RE":0},{"CO":0},{"CA":0},{"PF":0},{"PO":0},{"BO":0},{"PS":0}]
// "MF":0,"EQ":0,"FD":0,"RE":0,"CO":0,"CA":0,"PF":0,"PO":0,"BO":0,"PS":0
const types = [
    { "name": "Mutual Fund", "value": "MF"},
    { "name": "Equity", "value": "EQ" },
    { "name": "Fixed Deposit", "value": "FD" },
    { "name": "Real Estate", "value": "RE" },
    { "name":"Commodity", "value":"CO"},
    { "name": "Cash", "value": "CA" },
    { "name": "Employee Provident Fund", "value": "PF" },
    { "name": "Cryptocurrency", "value": "CC" },
    { "name": "Post Office", "value": "PO" },
    { "name": "Bonds", "value": "BO" },
    {"name":"PMS and AIF","value":"PA"}
    
]
const dropdownJSX = types.map((type) => { return <option value={type["value"]}>{type["name"]}</option>; });
const EditAsset = (props) => {
    let dataCpy = JSON.parse(JSON.stringify(props.userData));
    let valuesToEdit = props.userData.instruments[props.match.params.key];
    let dropdownVal = _.find(types, function (item) { return item.name === valuesToEdit["type"]; })["value"];
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
                        Location: valuesToEdit.location,
                        Investment: valuesToEdit.hist[0].investment,
                        CurrentValue: valuesToEdit.hist[0].value,
                        Type: dropdownVal
                    }
    });
    const onSubmit = data => {
    var notParsedDate = data.InvestmentDate;
    var dateString = notParsedDate.getFullYear() + "-" + ('0'+(notParsedDate.getMonth() + 1)).slice(-2);
    var dataFormatted = {};
    var typeKey = data["Type"];
    dataFormatted.type=_.find(types, function(type) { return type.value===data["Type"]; })["name"];
    dataFormatted.location = data.Location;
    dataFormatted.hist = [{ "key":typeKey,"date": dateString, "value": data.CurrentValue,"investment":data.Investment,"stamp":notParsedDate }];
    dataCpy["instruments"][typeKey] = dataFormatted;
    // console.log(dataCpy);
    props.editData(props.userId,dataCpy);
    };
    
  return (
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <div class="field">
            <label>Asset type</label>
              <select class="ui fluid dropdown" {...register("Type")}>
                <option value=""></option>
                {dropdownJSX}
              </select>
              {errors.Type?.message && <p>{errors.Type?.message}</p>}
            </div>
          <div className="field">
              <label>Location details</label>
              <input {...register("Location")} />
              {errors.Location?.message && <p>{errors.Location?.message}</p>}
        </div>
          <div className="field">
              <label>Investment</label>
              <input type="number" {...register("Investment", { valueAsNumber: true })} />
              {errors.Investment?.message && <p>{errors.Investment?.message}</p>}
          </div>
          <div className="field">
              <label>Investment date</label>
              <input Value={ valuesToEdit.hist[0].date} type="month" {...register("InvestmentDate", { valueAsDate: true })} />
              {errors.InvestmentDate?.message && <p>{errors.InvestmentDate?.message}</p>}
        </div>
          <div className="field">
            <label>Current value</label>
              <input type="number" {...register("CurrentValue", { valueAsNumber: true })} />
            {errors.CurrentValue?.message && <p>{errors.CurrentValue?.message}</p>}
        </div>
        <div>        
              <input className="ui button primary" type="submit" value="Modify" />
              <Link className="ui button" to="/assets">Cancel</Link>
        </div>
    </form>
  );
}

const mapStateToProps = (state) => {
    return {userId:state.auth.userId,userData:state.userData[state.auth.userId]}
}
export default connect(mapStateToProps,{editData})(EditAsset);