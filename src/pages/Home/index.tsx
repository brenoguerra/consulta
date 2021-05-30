import React, { useRef, useState, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import api from '../../services/api'

import { FaSearch, FaPen, FaSpinner, FaPlus, FaExclamationCircle } from 'react-icons/fa'

import { Container, SearchList, Result } from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

interface SearchFormData {
  type: string;
  search: string;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [buttonIcon, setButtonIcon] = useState(<FaSearch />)
  const [buttonText, setButtonText] = useState('Consultar')
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState('Nome')
  const [isErrored, setIsErrored] = useState(false)

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      if (!isLoading) {
        try {
          setIsLoading(true)
          setButtonIcon(<FaSpinner />)
          setButtonText('Consultando...')
          setIsErrored(false)

          const response = await api.post(`?consultar=${data.search}&tipo=${data.type}`)
          if (response.data.retorno === 'ERRO') throw new Error(response.data.msg)

          setIsLoading(false)
          setButtonIcon(<FaSearch />)
          setButtonText('Consultar')
        } catch (error) {
          setButtonIcon(<FaExclamationCircle />)
          setButtonText(error.message)

          setIsErrored(true)

          setTimeout(() => {
            setIsLoading(false)
            setButtonIcon(<FaSearch />)
            setButtonText('Consultar')

            setIsErrored(false)
          }, 4000)
        }
      }
    }, [isLoading]
  )

  const handleChangeSearchType = useCallback(() => {
    setSearchType(formRef.current?.getFieldValue('type'))
  }, [])

  return (
    <>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="searchType">
              <p>Consultar por</p>

              <div className="typeBox">
                <Select name="type" onChange={handleChangeSearchType}>
                  <option disabled>Selecione</option>
                  <option>Nome</option>
                  <option>Telefone</option>
                  <option>CPF</option>
                  <option>RG</option>
                  <option>CNPJ</option>
                </Select>
              </div>
            </div>

            <div className="searchInput">
              <p>Informe o {searchType.toLowerCase()}</p>
              <Input name="search" icon={FaPen} placeholder={`${searchType} para pesquisa`} />
            </div>
          </div>

          <div className="searchButton">
            <Button type="submit" isLoading={isLoading} isErrored={isErrored}>
              {buttonIcon}
              {buttonText}
            </Button>
          </div>
        </Form>

        <SearchList>
          <Result>
            <p>João Silva Fernandes</p>
            <p>321.456.879-99</p>
            <button><FaPlus /> <p>Ver mais</p></button>
          </Result>

          <Result>
          <p>Marco Aurélio</p>
            <p>254.112.494-75</p>
            <button><FaPlus /> <p>Ver mais</p></button>
          </Result>

          <Result>
            <p>Cristiano Félix Raimundo</p>
            <p>888.572.874-77</p>
            <button><FaPlus /> <p>Ver mais</p></button>
          </Result>
        </SearchList>
      </Container>
    </>
  )
}

export default Home