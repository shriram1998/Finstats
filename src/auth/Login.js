import { React ,useEffect,useState} from 'react';
import { connect } from 'react-redux';
import history from '../shared/History';
import { loginUser,disposeErrors } from './AuthAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
const labels = {
    'email': 'E-mail',
    'password': 'Password',
}
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const Login = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(schema)});
    useEffect(() => {
        if (props.isAuthenticated) {
            history.push('/dashboard');
        }
        props.disposeErrors();
    }, []);
    const onSubmit = data => {
        props.loginUser(data);
    };
    const formElems = Object.entries(labels).map(([k,v]) => {
        return (<div className="field">
            <label>{v}</label>
            <input type={k.includes('password')?'password':'text'} {...register(k)} />
            {errors[k]?.message && <p>{errors[k]?.message}</p>}
            {props.backendErrors[k] && <p>{props.backendErrors[k]}</p>}
        </div>);
    });
    return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        {formElems}
        <div>       
            <input className="ui button primary" type="submit" />
        </div>
    </form>
  );
}

const mapStateToProps = (state) => {
    return {isAuthenticated:state.auth.isAuthenticated,backendErrors:state.errors}
}
export default connect(mapStateToProps,{loginUser,disposeErrors})(Login);