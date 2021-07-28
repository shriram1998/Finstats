import React from 'react';
import { connect } from 'react-redux';
import { editData } from './AssetAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { TYPES } from '../shared/Constants';
const schema = z.object({
    invested_amount: z.number().positive({ message: "Positivity, please?" }),
    current_amount: z.number().positive({ message: "Positivity, please?" }),
    asset_id: z.string(),
    asset_details:z.string()
});
// [{"MF":0},{"EQ":0},{"FD":0},{"RE":0},{"CO":0},{"CA":0},{"PF":0},{"PO":0},{"BO":0},{"PS":0}]
// "MF":0,"EQ":0,"FD":0,"RE":0,"CO":0,"CA":0,"PF":0,"PO":0,"BO":0,"PS":0
// const types = [
//     { "name": "Mutual Fund", "value": "MF"},
//     { "name": "Equity", "value": "EQ" },
//     { "name": "Fixed Deposit", "value": "FD" },
//     { "name": "Real Estate", "value": "RE" },
//     { "name":"Commodity", "value":"CO"},
//     { "name": "Cash", "value": "CA" },
//     { "name": "Employee Provident Fund", "value": "PF" },
//     { "name": "Cryptocurrency", "value": "CC" },
//     { "name": "Post Office", "value": "PO" },
//     { "name": "Bonds", "value": "BO" },
//     {"name":"PMS and AIF","value":"PA"}
    
// ]
const dropdownJSX = TYPES.map((type) => { return <option value={type["value"]}>{type["name"]}</option>; });
const EditAsset = (props) => {
  let valuesToEdit = _.find(props.assetOverview, function (item) { return item.asset_id === props.match.params.key;});
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
                      asset_details: valuesToEdit.asset_details,
                      invested_amount: valuesToEdit.invested_amount,
                      current_amount: valuesToEdit.current_amount,
                      asset_id: valuesToEdit.asset_id
                  }
  });
  const onSubmit = data => {
      var notParsedDate = new Date();
      var dateString = notParsedDate.getFullYear() + "-" + ('0'+(notParsedDate.getMonth() + 1)).slice(-2) ;
      data['date'] = dateString;
      console.log(data);
      props.editData(data);
    };
    
  return (
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <div class="field">
            <label>Asset type</label>
              <select class="ui fluid dropdown" {...register("asset_id")} disabled>
                <option value=""></option>
                {dropdownJSX}
              </select>
              {errors.asset_id?.message && <p>{errors.asset_id?.message}</p>}
            </div>
          <div className="field">
              <label>Asset details</label>
              <input {...register("asset_details")} />
              {errors.asset_details?.message && <p>{errors.asset_details?.message}</p>}
        </div>
          <div className="field">
              <label>Investment</label>
              <input type="number" {...register("invested_amount", { valueAsNumber: true })} />
              {errors.invested_amount?.message && <p>{errors.invested_amount?.message}</p>}
          </div>
          {/* <div className="field">
              <label>Investment date</label>
              <input Value={ valuesToEdit.date} type="month" {...register("date", { valueAsDate: true })} />
              {errors.date?.message && <p>{errors.date?.message}</p>}
        </div> */}
          <div className="field">
            <label>Current value</label>
              <input type="number" {...register("current_amount", { valueAsNumber: true })} />
            {errors.current_amount?.message && <p>{errors.current_amount?.message}</p>}
        </div>
        <div>        
              <input className="ui button primary" type="submit" value="Modify" />
              <Link className="ui button" to="/assets">Cancel</Link>
        </div>
    </form>
  );
}

const mapStateToProps = (state) => {
    return {id:state.auth.user.id,assetOverview:state.asset.overview}
}
export default connect(mapStateToProps,{editData})(EditAsset);