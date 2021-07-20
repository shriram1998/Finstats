import { React ,useEffect,useState} from 'react';
import { connect } from 'react-redux';
import history from '../shared/History';
import { registerUser,disposeErrors } from './AuthAction';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import _ from 'lodash';
const labels = {
    'name': 'Name',
    'email': 'E-mail',
    'password': 'Password',
    'password_confirm':'Confirm Password'}
const schema = z.object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirm: z.string().min(6)
});

const Register = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(schema)});
    useEffect(() => {
        if (props.isAuthenticated) {
            history.push('/');
        }
        props.disposeErrors();
    }, []);
    const [rootError, setrootError] = useState('');
    const onSubmit = data => {
        if (data.password !== data.password_confirm) {
            setrootError("Passwords don't match");
        }
        else {
            props.registerUser(data);
        }
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
            {rootError? <p>{rootError}</p>:null}
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
export default connect(mapStateToProps,{registerUser,disposeErrors})(Register);