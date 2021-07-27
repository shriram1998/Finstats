import { React ,useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    // const formElems = Object.entries(labels).map(([k,v]) => {
    //     return (<div className="field">
    //         <label>{v}</label>
    //         <input type={k.includes('password')?'password':'text'} {...register(k)} />
    //         {errors[k]?.message && <p>{errors[k]?.message}</p>}
    //         {props.backendErrors[k] && <p>{props.backendErrors[k]}</p>}
    //     </div>);
    // });

    return (
        <div className="imagebg">
            <div className="authSegment">
                <div className="welcomeText whiteText centerText">
                    Welcome to Finstats!
                </div>
                <div className="signText centerText">
                    Login to your account
                </div>
                <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="ui stacked segment authColor">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" name="email" {...register("email")} placeholder="E-mail address"/>
                            </div>
                            <div className="lightRedText authErr">
                                {errors["email"]?.message && <p>{errors["email"]?.message}</p>}
                                {props.backendErrors["email"] && <p>{props.backendErrors["email"]}</p>}
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"/>
                                <input type="password" name="password" {...register("password")} placeholder="Password"/>
                            </div>
                            <div className="lightRedText authErr">
                                {errors["password"]?.message && <p>{errors["password"]?.message}</p>}
                                {props.backendErrors["password"] && <p>{props.backendErrors["password"]}</p>}
                            </div>
                        </div>
                        <button className="ui fluid large basic submit button teal authBtn">Login</button>
                    </div>
                    <div className="ui error message"></div>
                </form>
                <div className="ui authColor centerText whiteText message">
                <h3>New to us? <Link to="/register">Sign Up</Link></h3>
                </div>
            </div>
        </div>
  );
}

const mapStateToProps = (state) => {
    return {isAuthenticated:state.auth.isAuthenticated,backendErrors:state.errors}
}
export default connect(mapStateToProps, { loginUser, disposeErrors })(Login);