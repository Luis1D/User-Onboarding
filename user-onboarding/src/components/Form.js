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
        <div className="form-container">
            <Form className="form">
                <div className="input-container">
                    { touched.username && errors.username && <p className="error">{ errors.username }</p>}
                    <Field type="username" name="username" placeholder="Username" className="input"/>
                </div>
                <div className="input-container">
                    { touched.email && errors.email && <p className="error">{ errors.email }</p>}
                    <Field type="email" name="email" placeholder="Email" className="input"/>
                </div>
                <div className="input-container">
                    { touched.password && errors.password && <p className="error">{ errors.password }</p>}
                    <Field type="password" name="password" placeholder="Password" className="input"/>
                </div>
                { touched.role && errors.role && <p className="error">{ errors.role }</p>}
                <div className="dropdown-container">
                    <Field component="select" name="role" className="dropdown">
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                    </Field>
                </div>
                <label>
                    { touched.tos && errors.tos && <p className="error">{ errors.tos }</p>}
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept Out Terms Of Service
                </label>
                <div>
                    <button>Submit</button>
                </div>
            </Form>
            <h1>Team Members</h1>
            {
                users.map((usr, key) => {
                    return <UserCard username={ usr.username } role={ usr.role } email={ usr.email } key={ key }/>
                })
            }
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, email, password, role, tos }) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            role: role || "Front-End",
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
        // role: Yup.string()
        //     .required("Please chose a role.."),
        tos: Yup.bool()
            .oneOf([true], 'Agree with our terms!'),
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