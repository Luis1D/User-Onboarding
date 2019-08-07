import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import UserCard from "./UserCard";

function MyForm ({ values, errors, touched, status }) {

    const [users, setUsers] = useState([]);
    console.log(users)

    useEffect(() => {
        if(status) {
            setUsers(users => [...users, status])
        }
    }, [status]);

    return (
        <div>
            <Form>
                <div>
                    { touched.username && errors.username && <p>{ errors.username }</p>}
                    <Field type="username" name="username" placeholder="Username" />
                </div>
                <div>
                    { touched.email && errors.email && <p>{ errors.email }</p>}
                    <Field type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    { touched.password && errors.password && <p>{ errors.password }</p>}
                    <Field type="password" name="password" placeholder="Password" />
                </div>
                <label>
                    { touched.tos && errors.tos && <p>{ errors.tos }</p>}
                    <Field type="checkbox" name="tos" checked={values.tos}/>
                    Accept Out Terms Of Service
                </label>
                <button>Submit</button>
            </Form>
            {
                users.map((usr, key) => {
                    return <UserCard username={ usr.username } email={ usr.email }  id={ key }/>
                })
            }
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, email, password, tos }) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .max(5, "Username must be no more than 5 characters..")
            .required("Username required.."),
        email: Yup.string()
            .email("Valid email required..")
            .required("Email required.."),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters..")
            .required("Password Required.."),
        // tos: Yup.boolean()
        //     .isValid("true"),
    }),
    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);
            console.log("RESPONSE", res.data);
        })
        .catch(err => {
            console.log("ERROR", err);
        });
    }
})(MyForm);

export default FormikLoginForm;