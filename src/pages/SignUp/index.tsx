import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContent } from './styles';

interface SignUpFormData {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [buttonText, setButtonText] = useState('Cadastrar')
  const [isErrored, setIsErrored] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      if (!isLoading) {
        try {
          setIsLoading(true)
          setButtonText('Carregando...')
          setIsErrored(false)

          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            username: Yup.string().required('Nome de usuário inválido'),
            password: Yup.string().min(6, 'Senha muito curta'),
            passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post('/users', data);
          history.push('/');

          setIsLoading(false)
          setButtonText('Cadastrar')
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            console.log(error)
            const errors = getValidationErrors(error);

            setButtonText(Object.values(errors)[0])

            setIsErrored(true)

            setTimeout(() => {
              setIsLoading(false)
              setButtonText('Cadastrar')

              setIsErrored(false)
            }, 1000)
            return;
          }

          setButtonText('Ocorreu um problema')

          setIsErrored(true)

          setTimeout(() => {
            setIsLoading(false)
            setButtonText('Cadastrar')

            setIsErrored(false)
          }, 1000)
        }
      }
    },
    [history, isLoading],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Realize seu cadastro</h1>

            <Input name="username" icon={FiUser} placeholder="Usuário" />
            <br />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <br />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Confirme a senha"
            />

            <Button type="submit" isErrored={isErrored} isLoading={isLoading}>{buttonText}</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={20} /> Voltar para login
          </Link>
        </AnimationContent>
      </Content>
    </Container>
  );
};

export default SignUp;
