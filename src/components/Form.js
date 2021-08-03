import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import TextError from "./TextError";

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phones: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'User',
    email: 'test@user.com',
    channel: 'TestChannel',
    comments: 'Lorem ipsum test comment',
    address: 'Spooner str. 45',
    social: {
        facebook: '',
        twitter: ''
    },
    phones: ['', ''],
    phNumbers: ['']
}


const onSubmit = (values, onSubmitProps) => {
    console.log('Submitted data:', values)
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    channel: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
})

const validateComments = value => {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

function YoutubeForm() {

    const [data, setData] = useState(null);


    return (
        <Formik initialValues={data || initialValues} validationSchema={validationSchema} enableReinitialize
                onSubmit={onSubmit}>
            {formik => {
                return (
                    <Form>
                        <div className='form-control'>
                            <label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name'/>
                            <ErrorMessage name='name' component={TextError}/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='email'>Email</label>
                            <Field type='email' id='email' name='email'/>
                            <ErrorMessage name='email' component={TextError}/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='channel'>Channel</label>
                            <Field type='text' id='channel' name='channel'
                                   placeholder="Please enter your channel name"/>
                            <ErrorMessage name='channel' component={TextError}/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='comments'>Comments</label>
                            <Field as='textarea' id='comments' name='comments' validate={validateComments}/>
                            <ErrorMessage name='comments' component={TextError}/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='address'>Address</label>
                            <Field type='text' id='address' name='address'/>
                            <ErrorMessage name='address' component={TextError}/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='facebook'>Facebook profile</label>
                            <Field type='text' id='facebook' name='social.facebook'/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='twitter'>Twitter profile</label>
                            <Field type='text' id='twitter' name='social.twitter'/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='primaryPh'>Primary phone number</label>
                            <Field type='text' id='primaryPh' name='phones[0]'/>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='secondaryPh'>Secondary phone number</label>
                            <Field type='text' id='secondaryPh' name='phones[1]'/>
                        </div>

                        <div className='form-control'>
                            <label>List of phone numbers</label>
                            <FieldArray name="phNumbers">
                                {fieldArrayProps => {
                                    const {push, remove, form} = fieldArrayProps;
                                    const {values} = form;
                                    const {phNumbers} = values;
                                    return (
                                        <div>
                                            {phNumbers.map((phNumber, index) => (
                                                <div key={index}>
                                                    <Field name={`phNumbers[${index}]`} />
                                                    <button type='button' onClick={() => remove(index)}> - </button>
                                                    <button type='button' onClick={() => push('')}> + </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                                }
                            </FieldArray>
                        </div>

                        <button type='button' onClick={() => setData(savedValues)}>Load saved data</button>
                        <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    </Form>
                )
            }}
        </Formik>


    )
}

export default YoutubeForm;