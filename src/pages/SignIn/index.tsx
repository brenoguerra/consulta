import React, { useCallback, useRef, useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [buttonText, setButtonText] = useState('Entrar')
  const [isErrored, setIsErrored] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      if (!isLoading) {
        try {
          setIsLoading(true)
          setButtonText('Carregando...')
          setIsErrored(false)

          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            username: Yup.string().required('Insira o usuário'),
            password: Yup.string().required('Insira a senha'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await signIn({
            username: data.username,
            password: data.password,
          });

          history.push('/search');

          setIsLoading(false)
          setButtonText('Entrar')
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors);
            setButtonText(Object.values(errors)[0])

            setIsErrored(true)

            setTimeout(() => {
              setIsLoading(false)
              setButtonText('Entrar')

              setIsErrored(false)
            }, 1000)
            return;
          }

          setButtonText('Credenciais inválidas')

          setIsErrored(true)

          setTimeout(() => {
            setIsLoading(false)
            setButtonText('Cadastrar')

            setIsErrored(false)
          }, 1000)
        }
      }
    },
    [history, signIn, isLoading],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Entre para continuar</h1>

            <Input name="username" icon={FiUser} placeholder="Usuário" />
            <br />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" isLoading={isLoading} isErrored={isErrored}>{buttonText}</Button>
          </Form>

          <Link to="/signup">Ainda não tem uma conta?</Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
