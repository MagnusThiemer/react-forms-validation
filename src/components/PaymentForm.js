import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { StateContext } from '../Context/Context';

const schema = yup.object({
    cardNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Ugyldigt kortnummer')
        .min(16, 'Ugyldigt kortnummer')
        .max(16, 'Ugyldigt kortnummer')
        .required('Udfyld kortnummer'),
    cardName: yup
        .string()
        .matches(/^[A-Za-zÀ-ÿ ]+$/, 'Navn må kun indeholde bogstaver')
        .required('Udfyld navn som det står på kortet'),
    expiryDate: yup
        .string()
        .matches(/^[0-9]+$/, 'Ugyldigt kortnummer')
        .min(4, 'Brug formatet MM/ÅÅ')
        .max(4, 'Brug formatet MM/ÅÅ')
        .required('Udfyld navn som det står på kortet'),
    security: yup
        .string()
        .matches(/^[0-9]+$/, 'Ugyldigt kortnummer')
        .min(3, 'Ugyldigt sikkerhedstal')
        .max(3, 'Ugyldigt sikkerhedstal')
        .required('Udfyld sikkerhedstal')
}).required()

const PaymentForm = () => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { userData, setUserData } = useContext(StateContext)

    const onSubmit = (cardData) => {
        setUserData({...userData, cardData})
    }
    return ( 
        <div className="Form Payment-form">
            <header className="form__header">
                <h2>Betaling</h2>
            </header>
            <div className="arrow-down"></div>
            <div className="Payment-form__summary">
                <p>Tak for din tilmelding, {userData.firstName}</p>
                <p>Du er ved at oprette en profil med emailadressen: {userData.email}</p>
            </div>
            <form action="POST" className="Payment-form__form" onSubmit={handleSubmit(onSubmit)} data-netlify='true' name='formPaymentInformation'>
                <input type="hidden" name='form-name' value='formPaymentInformation' />
                <input 
                    {...register('cardNumber')}
                    className='form__input' 
                    type="text" 
                    name='cardNumber' 
                    placeholder='Kortnummer'/>
                {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
                <input 
                    {...register('cardName')}
                    className='form__input' 
                    type="text" 
                    name='cardName' 
                    placeholder='Navn på kort'/>
                {errors.cardName && <p>{errors.cardName.message}</p>}
                <div className="">
                    <input 
                        {...register('expiryDate')}
                        className='form__input' 
                        type="text" 
                        name='expiryDate' 
                        placeholder='Udløbsdato MM/ÅÅ'/>
                    {errors.expiryDate && <p>{errors.expiryDate.message}</p>}
                    <input 
                        {...register('security')}
                        className='form__input' 
                        type="text" 
                        name='security' 
                        placeholder='Sikkerhedstal'/>
                    {errors.security && <p>{errors.security.message}</p>}
                </div>
                <input type="submit" className="form__button" defaultValue='Betal'/>
            </form>
        </div>
     );
}
 
export default PaymentForm;