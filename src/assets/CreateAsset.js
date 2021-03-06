import React from 'react';
import { connect } from 'react-redux';
import { createData } from './AssetAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
import { TYPES } from '../shared/Constants';
const schema = z.object({
    invested_amount: z.number().positive({ message: "Positivity, please?" }),
    date:z.date(),
    current_amount: z.number().positive({ message: "Positivity, please?" }),
    asset_id: z.string().nonempty({ message: "Please select a type" }),
    asset_details:z.string()
});

const dropdownJSX = TYPES.map((type) => { return <option value={type["value"]}>{type["name"]}</option>; });
const CreateAsset = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(schema)});
    const onSubmit = data => {
      var notParsedDate = data.date;
      var dateString = notParsedDate.getFullYear() + "-" + ('0'+(notParsedDate.getMonth() + 1)).slice(-2) ;
      data['date'] = dateString;
      props.createData(data);
  };
  return (
    <div className="ui container defaultContainer mt">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Asset type</label>
              <select class="ui fluid dropdown" {...register("asset_id")}>
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
              <label>Invested amount</label>
              <input type="number" {...register("invested_amount", { valueAsNumber: true })} />
              {errors.invested_amount?.message && <p>{errors.invested_amount?.message}</p>}
          </div>
          <div className="field">
              <label>Date of investment</label>
              <input type="month" {...register("date", { valueAsDate: true })} />
              {errors.date?.message && <p>{errors.date?.message}</p>}
        </div>
          <div className="field">
            <label>Current amount</label>
            <input type="number" {...register("current_amount", { valueAsNumber: true })} />
            {errors.current_amount?.message && <p>{errors.current_amount?.message}</p>}
        </div>
        <div>        
            <input className="ui button primary" type="submit" />
        </div>
      </form>
    </div>  
  );
}

const mapStateToProps = (state) => {
    return {id:state.auth.user.id}
}
export default connect(mapStateToProps,{createData})(CreateAsset);