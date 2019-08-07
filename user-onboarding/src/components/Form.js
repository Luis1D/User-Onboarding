import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function MyForm ({ values, errors, touched }) {
    return (
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
                <Field type="checkbox" name="tos" checked={values.tos}/>
                Accept Out Terms Of Service
            </label>
            <button>Submit</button>
        </Form>
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
    // validationSchema
})(MyForm);

export default FormikLoginForm;