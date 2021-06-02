import React, { useRef, useState, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import api from '../../services/api'

import { FaSearch, FaPen, FaSpinner, FaPlus, FaExclamationCircle } from 'react-icons/fa'

import { Container, SearchList, Result } from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Modal from '../../components/Modal'

interface SearchFormData {
  type: string;
  search: string;
}

interface ResultData {
  pessoa: {
    cadastral: any;
  };
}

interface PersonData {
  cadastral?: {
    CPF?: string;
    nomePrimeiro?: string;
    nomeMeio?: string;
    nomeUltimo?: string;
    nomnomeParentesco?: string;
    sexo?: string;
    dataNascimento?: string;
    statusReceitaFederal?: string;
    dataAtualizacaoStatusReceitaFederal?: string;
    rgNumero?: string;
    rgOrgaoEmissor?: string;
    rgUf?: string;
    tituloEleitoral?: string;
    obito?: string;
    nacionalidade?: string;
    menorDeIdade?: string;
    ppp?: string;
    estadoCivil?: string;
    maeCPF?: string;
    maeNomePrimeiro?: string;
    maeNomeMeio?: string;
    maeNomeUltimo?: string;
    maeNomeParentesco?: string;
    escolaridade?: string;
    cns?: string;
    pep?: string;
  };
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [hasResults, setHasResults] = useState(false)
  const [results, setResults] = useState<ResultData[]>([])

  const [buttonIcon, setButtonIcon] = useState(<FaSearch />)
  const [buttonText, setButtonText] = useState('Consultar')
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState('Nome')
  const [isErrored, setIsErrored] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState<PersonData>({} as PersonData)

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      if (!isLoading) {
        try {
          setIsLoading(true)
          setButtonIcon(<FaSpinner />)
          setButtonText('Consultando...')
          setIsErrored(false)

          const response = await api.post(`?consultar=${data.search}&tipo=${data.type.toLowerCase()}`)
          if (response.data.retorno === 'ERRO') throw new Error(response.data.msg)

          if (response.data.msg && response.data.msg.length) {
            setHasResults(true)
            setResults(response.data.msg)
          }

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
              <Input type={searchType === 'Nome' ? "text" : "number"} name="search" icon={FaPen} placeholder={`${searchType} para pesquisa`} />
            </div>
          </div>

          <div className="searchButton">
            <Button type="submit" isLoading={isLoading} isErrored={isErrored}>
              {buttonIcon}
              {buttonText}
            </Button>
          </div>
        </Form>

        {
          hasResults &&
          <SearchList>
            {
              results && results.length && results.map(result => (
                <Result key={result.pessoa.cadastral.cpf} onClick={() => {
                  setData(result.pessoa)
                  setIsModalVisible(true)
                }}>
                  <p>{result.pessoa.cadastral.nomePrimeiro} {result.pessoa.cadastral.nomeUltimo}</p>
                  <p>{result.pessoa.cadastral.CPF}</p>
                  <button><FaPlus /> <p>Ver mais</p></button>
                </Result>
              ))
            }
          </SearchList>
        }

        {
          data && isModalVisible && (
            <Modal onClose={() => setIsModalVisible(false)} data={data} />
          )
        }
      </Container>
    </>
  )
}

export default Home
