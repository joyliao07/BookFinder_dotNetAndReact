import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import TextInput from "../form/common/TextInput";

const LoginForm = () => {
    const {userStore} = useStore();

    return(
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch( error =>
                setErrors({error: 'Invalid email or password'}))}>
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form   className='ui form' 
                            onSubmit={handleSubmit}
                            autoComplete='off'>
                        <TextInput name='email' placeholder='Email'/>
                        <TextInput name='password' placeholder='Password' type='password'/>
                        <ErrorMessage 
                            name='error' render={() =>
                            <Label style={{marginBottom: 12}} basic color='red' content={errors.error}/>} />
                        <Button loading={isSubmitting} positive content='Login' type='submit' fluid/>
                    </Form>
                )}
        </Formik>
    )
}

export default observer(LoginForm);
