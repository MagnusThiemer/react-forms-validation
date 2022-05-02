import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {

/*     -------------------- */
/*  FORM VALIDATION WITH REACT HOOK FORM */
/*     -------------------- */

    const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();
    
    const validation = (data) => {
        console.log(data);
    }

    return ( 
        <div className="Form">
            <header className="form__header">
                <h2>React hook forms validering</h2>
            </header>
            <div className="arrow-down"></div>
            <form action="" className="form__form" onSubmit={handleSubmit(validation)}>
                <label className='hidden' htmlFor="fornavn">Fornavn</label>
                <input 
                    {...register('fornavn', {required: true, maxLength: 20})}
                    id="fornavn" 
                    name="fornavn" 
                    type="text" 
                    placeholder="Fornavn" 
                    className="form__input"/>
                {errors.fornavn?.type == 'required' && <span>Udfyld fornavn</span>}
                {errors.fornavn?.type == 'maxLength' && <span>Maks. længde 20 karakterer</span>}
                <label htmlFor="efternavn" className='hidden'>Efternavn</label>
                <input 
                    {...register('efternavn', {required: true, maxLength: 20})}
                    id="efternavn" 
                    name="efternavn" 
                    type="text" 
                    placeholder="Efternavn" 
                    className="form__input"/>
                {errors.efternavn?.type == 'required' && <span>Udfyld efternavn</span>}
                {errors.efternavn?.type == 'maxLength' && <span>Maks. længde 20 karakterer</span>}
                <label htmlFor="email" className='hidden'>Email</label>
                <input 
                    {...register('email', {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}
                    id="email" 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    className="form__input"/>
                {errors.email?.type == 'pattern' && <span>Indtast gyldig email</span>}
                <label htmlFor="confirmemail" className='hidden'>Bekræft email</label>
                <input 
                    {...register('confirmemail', {validate: value => value === getValues('email')})}
                    id="confirmemail" 
                    name="confirmemail" 
                    type="text" 
                    placeholder="Bekræft email" 
                    className="form__input"/>
                {errors.confirmemail?.type == 'validate' && <span>Email skal matche</span>}
                <label htmlFor="password" className='hidden'>Password</label>
                <input 
                    {...register('password', {required: true})}
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Kodeord" 
                    className="form__input"/>
                <div className="form__checkbox">
                    <input 
                        {...register('conditions', {required: true})}
                        id="conditions" 
                        name="conditions" 
                        type="checkbox" 
                        className=""/>
                    <label htmlFor="conditions">Jeg accepterer Zetlands medlemsvilkår, herunder at Zetland må sende mig tilbud.</label>
                </div>
                {errors.conditions?.type == 'required' && <span>Accepter medlemsvilkår</span>}
                <button className="form__button">Videre</button>
            </form>
        </div>
     );
}
 
export default Form;