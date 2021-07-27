import { React ,useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
})
.refine(obj => obj.password === obj.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
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
            errors["password"] = {}
            errors["password"]["message"] = "Passwords don't match";
        }
        else {
            props.registerUser(data);
        }
    };
    const formElems = Object.entries(labels).map(([k,v]) => {
        return (<div className="field authField">
            <div className="ui input">
                <input placeholder={v} type={k.includes('password') ? 'password' : 'text'} {...register(k)} />
            </div>
            <div className="lightRedText authErr">
                {errors[k]?.message && <p>{errors[k]?.message}</p>}
                {props.backendErrors[k] && <p>{props.backendErrors[k]}</p>}
            </div>
        </div>);
    });
    return (
        <div className="imagebg">
            <div className="authSegment">
                <div className="welcomeText whiteText centerText">
                    Welcome to Finstats!
                </div>
                <div className="signText centerText">
                    Create your account
                </div>
                <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
                    {rootError? <p className="whiteText">{rootError}</p>:null}
                    <div className="ui stacked segment authColor">
                        {formElems }
                        <button className="ui fluid large basic submit button teal authBtn">Sign Up</button>
                    </div>
                    <div className="ui error message"></div>
                </form>
                <div className="ui authColor centerText whiteText message">
                    <h3>Already an user? <Link to="/login">Log in</Link></h3>
                </div>
            </div>
        </div>
  );
}

const mapStateToProps = (state) => {
    return {isAuthenticated:state.auth.isAuthenticated,backendErrors:state.errors}
}
export default connect(mapStateToProps, { registerUser, disposeErrors })(Register);