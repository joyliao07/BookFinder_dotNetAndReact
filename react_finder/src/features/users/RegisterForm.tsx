import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Header, Button } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import TextInput from "../form/common/TextInput";
import * as Yup from 'yup';
import ValidationErrors from "./ValidationErrors";

const RegisterForm = () => {
    const {userStore} = useStore();

    return(
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch( error => 
                setErrors({error})
            )}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}>
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form   className='ui form error' 
                            onSubmit={handleSubmit}
                            autoComplete='off'>
                        <Header as='h2' color='teal' textAlign='center'
                                content='Sign up to BookFinder' />
                        <TextInput name='displayName' placeholder='Display Name'/>
                        <TextInput name='username' placeholder='Username'/>
                        <TextInput name='email' placeholder='Email'/>
                        <TextInput name='password' placeholder='Password' type='password'/>
                        <ErrorMessage   name='error' 
                                        render={() => <ValidationErrors errors={errors.error}/>}
                        />
                        <Button disabled={!isValid || !dirty || isSubmitting} 
                                loading={isSubmitting} color='teal' content='Register' type='submit' fluid/>
                    </Form>
                )}
        </Formik>
    )
}

export default observer(RegisterForm);