import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../Context/Context';

const schema = yup.object({
    firstName: yup.string().matches(/^[A-Za-zÀ-ÿ ]+$/, 'Fornavn må kun indeholde bogstaver').required('Udfyld fornavn'),
    lastName: yup.string().matches(/^[A-Za-zÀ-ÿ ]+$/, 'Efternavn må kun indeholde bogstaver').required('Udfyld efternavn'),
    email: yup.string().email().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'Ugyldig email').required('Udfyld email'),
    confirmEmail: yup.string().oneOf([yup.ref('email')], 'Emailadresser matcher ikke').required('Udfyld emailadresse igen'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password skal indeholde mindst 8 tegn, 1 stort bogstav, 1 lille bogstav og 1 tal').required('Udfyld password'),
    acceptTerms: yup.boolean().oneOf([true], 'Accepter betingelser')
}).required()


const FormYup = () => {
    /*     -------------------- */
    /*  FORM VALIDATION WITH YUP */
    /*     -------------------- */

    const { userData, setUserData } = useContext(StateContext);
    
    const navigate = useNavigate()
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setUserData(data);
        navigate('/paymentPage')
    }

    return ( 
        <div className="Form">
            <header className="form__header">
                <h2>Yup form validering</h2>
            </header>
            <div className="arrow-down"></div>
            <form action="POST" className="form__form" onSubmit={handleSubmit(onSubmit)} data-netlify='true' name='formProfileInformation' netlify>
                <input type="hidden" name='form-name' value='formProfileInformation'/>
                <label className='hidden' htmlFor="firstName">Fornavn</label>
                <input 
                    {...register('firstName')}
                    id="fornavn2" 
                    name="firstName" 
                    type="text" 
                    placeholder="Fornavn" 
                    className="form__input"/>
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <label className='hidden' htmlFor="lastName">Efternavn</label>
                <input 
                    {...register('lastName')}
                    id="efternavn2" 
                    name="lastName" 
                    type="text" 
                    placeholder="Efternavn" 
                    className="form__input"/>
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                <label className='hidden' htmlFor="email">Email</label>
                <input 
                    {...register('email')}
                    id="email2" 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    className="form__input"/>
                    {errors.email && <p>{errors.email.message}</p>}
                <label className='hidden' htmlFor="confirmEmail">Bekræft email</label>
                <input 
                    {...register('confirmEmail')}
                    id="confirmemail2" 
                    name="confirmEmail" 
                    type="text" 
                    placeholder="Bekræft email" 
                    className="form__input"/>
                    {errors.confirmEmail && <p>{errors.confirmEmail.message}</p>}
                <label className='hidden' htmlFor="password">Kodeord</label>
                <input 
                    {...register('password')}
                    id="password2" 
                    name="password" 
                    type="password" 
                    placeholder="Kodeord" 
                    className="form__input"/>
                    {errors.password && <p>{errors.password.message}</p>}
                <div className="form__checkbox">
                    <input 
                        {...register('acceptTerms')}
                        id="conditions2" 
                        name="acceptTerms" 
                        type="checkbox" 
                        className=""/>
                    <label htmlFor="conditions2">Jeg accepterer Zetlands medlemsvilkår, herunder at Zetland må sende mig tilbud.</label>
                </div>
                {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
                <input type='submit' className="form__button" defaultValue='Videre'/>
            </form>
        </div>
     );
}
 
export default FormYup;