import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';
import Cookie from 'js-cookie';
import { show } from './alert';
import Router from 'next/router';
import { RegisterFormValues } from '@/components/Auth/RegisterForm';
import { LoginFormValues } from '@/components/Auth/LoginForm';

export const authSignup = (values: RegisterFormValues): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/users/ ', {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
    })
    .then(() => {
      Router.push({ pathname: '/login' }, undefined, { shallow: true });
      dispatch(show('Вы успешно создали аккаунт! Подтвердите почту и войдите', 'success'));
    })
    .catch(() => {
      Router.push({ pathname: '/register' }, undefined, { shallow: true });
      dispatch(show('Пользователь с такими данными уже существует!', 'warning'));
    });
};

export const emailActivate = (token: string): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/api/activate/', {
      token,
    })
    .then(() => {
      dispatch(show('Активация прошла успешно!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка активации!', 'warning'));
    });
};

export const authLogin = (values: LoginFormValues): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/jwt/create/', {
      email: values.email,
      password: values.password,
    })
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);

      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);

      dispatch(checkAuthTimeout(24 * 3600 * 1000));
      dispatch(authInfo());

      Router.push({ pathname: '/control' }, undefined, { shallow: true });

      dispatch(show('Вы успешно вошли!', 'success'));
    })
    .catch(() => {
      dispatch(show('Неверный логин или пароль, перепроверьте данные!', 'warning'));
    });
};

export const authInfo = (): ThunkType => async dispatch => {
  await instance()
    .get('/auth/users/me/')
    .then(res => {
      Cookie.set('firstName', res.data.first_name);
      Cookie.set('lastName', res.data.last_name);
      Cookie.set('userId', res.data.id);
      Cookie.set('email', res.data.email);
      Cookie.set('isStaff', res.data.is_staff);

      Cookie.remove('chatId');
      Cookie.remove('manager');

      console.log('Информация успешно занесена в куки');
    })
    .catch(() => {
      dispatch(show('Ошибка при взятии информации о пользователе!', 'warning'));
    });
};

export const logout = (isRedirect: boolean): ThunkType => () => {
  if (isRedirect) {
    Router.push({ pathname: '/' }, undefined, { shallow: true });
  }
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('firstName');
  Cookie.remove('lastName');
  Cookie.remove('userId');
  Cookie.remove('email');
  Cookie.remove('password');
  Cookie.remove('isStaff');
};

export const checkAuthTimeout = (expirationTime: number): ThunkType => dispatch =>
  setTimeout(() => dispatch(logout(false)), expirationTime);

export const authCheckState = (): ThunkType => dispatch => {
  const token = Cookie.get('token');

  if (token === undefined) {
    dispatch(logout(false));
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      dispatch(logout(false));
    } else {
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};




