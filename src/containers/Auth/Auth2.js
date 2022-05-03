import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import { useState } from 'react';
import axios from 'axios';

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const Auth = () => {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      valid: false,
      touched: false,
      errorMessage: 'Введите корректный email',
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      valid: false,
      touched: false,
      errorMessage: 'Введите корректный пароль',
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = (event) => {
    event.perevenDefault();
  };
  const loginHandler = async () => {
    const loginData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSly4BlNHXxR5HZ5KgEiswDI67WkZEAiA',
        loginData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const registerHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSly4BlNHXxR5HZ5KgEiswDI67WkZEAiA',
        authData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid; //переопределение переменной isValid
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event, controlName) => {
    const formControlsCopy = { ...formControls };
    const controlCopy = { ...formControlsCopy[controlName] };

    controlCopy.value = event.target.value;
    controlCopy.touched = true;
    controlCopy.valid = validateControl(
      controlCopy.value,
      controlCopy.validation
    );

    formControlsCopy[controlName] = controlCopy;

    let isFormValid = true;
    Object.keys(formControlsCopy).forEach((name) => {
      isFormValid = formControlsCopy[name].valid && isFormValid; // переопределяем переменную isFormValid
    });

    setFormControls(formControlsCopy);
    setIsFormValid(isFormValid);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation} //!! - приведение к boolean типу
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form className={classes.AuthForm} onSubmit={submitHandler}>
          {renderInputs()}

          <Button type='success' onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button
            type='primary'
            onClick={registerHandler}
            // disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};
