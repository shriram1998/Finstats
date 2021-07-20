import React from 'react';
import { connect } from 'react-redux';
import { createData } from './AssetAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
import { date } from 'zod';
import { TYPES } from '../shared/Constants';
const schema = z.object({
    Location: z.string().nonempty(),
    Investment: z.number().positive({ message: "Positivity, please?" }),
    InvestmentDate:z.date(),
    CurrentValue: z.number().positive({ message: "Positivity, please?" }),
    Type: z.string().nonempty({ message: "Please select a type" } )
});

const dropdownJSX = TYPES.map((type) => { return <option value={type["value"]}>{type["name"]}</option>; });
const CreateAsset = (props) => {
  let dataCpy = JSON.parse(JSON.stringify(props.userData));
      const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(schema)});
      const onSubmit = data => {
        var notParsedDate = data.InvestmentDate;
        var dateString = notParsedDate.getFullYear() + "-" + ('0'+(notParsedDate.getMonth() + 1)).slice(-2) ;
        var dataFormatted = {};
        dataFormatted.type=_.find(TYPES, function(type) { return type.value===data["Type"]; })["name"];
        dataFormatted.location = data.Location;
        dataFormatted.hist = [{ "key":typeKey,"date": dateString, "value": data.CurrentValue,"investment":data.Investment,"stamp":data.InvestmentDate }];
        var typeKey = data["Type"];
        dataCpy["instruments"][typeKey] = dataFormatted;
        // console.log(dataCpy);
        props.createData(props.userId,dataCpy);
    };
  return (
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
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
              <input type="month" {...register("InvestmentDate", { valueAsDate: true })} />
              {errors.InvestmentDate?.message && <p>{errors.InvestmentDate?.message}</p>}
        </div>
          <div className="field">
            <label>Current value</label>
            <input type="number" {...register("CurrentValue", { valueAsNumber: true })} />
            {errors.CurrentValue?.message && <p>{errors.CurrentValue?.message}</p>}
        </div>
        <div>        
            <input className="ui button primary" type="submit" />
        </div>
    </form>
  );
}

const mapStateToProps = (state) => {
    return {userId:state.auth.userId,userData:state.userData[state.auth.userId]}
}
export default connect(mapStateToProps,{createData})(CreateAsset);