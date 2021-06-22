import React, { useRef, useState, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import api from '../../services/api'
import { useAuth } from '../../hooks/AuthContext';

import { FaSearch, FaPen, FaSpinner, FaPlus, FaExclamationCircle, FaPowerOff } from 'react-icons/fa'

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
  empresa: {
    cadastral: any;
  };
}

interface PersonData {
  cadastral?: {
    CPF?: string;
    nomePrimeiro?: string;
    nomeMeio?: string;
    nomeUltimo?: string;
    nomeParentesco?: string;
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
    // CNPJ
    CNPJ?: string;
    dataAbertura?: string;
    dataSituacaoCadastral?: string;
    inscricaoEstadual?: string;
    matriz?: string;
    motivoSituacaoCadastral?: string;
    nomeFantasia?: string;
    razaoSocial?: string;
    situacaoCadastral?: string;
    situacaoEspecial?: string;
  };
  beneficiarioProgramaSocial?: {
    bolsaFamilia?: string;
  };
  contato?: {
    endereco?: [{
      tipoLogradouro?: string;
      logradouro?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    }];
    email?: [{
      email?: string;
    }];
    telefone?: [{
      ddd?: string;
      numero?: string;
      operadora?: string;
      procon?: string;
      whatsapp?: string;
      tipoTelefone?: string;
    }];
  };
  vinculo?: {
    parentesco?: [{
      cpf?: string;
      nomeCompleto?: string;
      grauDeParentesco?: string;
    }];
    conjuge?: {
      nomePrimeiro?: string;
      nomeMeio?: string;
      nomeUltimo?: string;
      parentesco?: string;
    };
    vizinho?: [{
      cpf?: string;
      nomePrimeiro?: string;
      nomeMeio?: string;
      nomeUltimo?: string;
      nomeParentesco?: null;
    }];
    empregador?: [{
      cnpj?: string;
      razaoSocial?: string;
      dataAdmissao?: string;
    }];
  };
  patrimonio?: {
    veiculo?: [{
      marca?: string;
      modelo?: string;
      ano?: string;
      categoria?: string;
      subCategoria?: string;
      classificacao?: string;
    }];
    imovel?: [{
      contribuente?: string;
      anoExercicio?: string;
      tipoLogradouro?: string;
      logradouro?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
      areaTerreno?: string;
      areaConstruida?: string;
      valorMQuadradoTerreno?: string;
      valorMQuadradoConstrucao?: string;
      quantidadePavimentos?: string;
      tipoUsoImovel?: string;
      tipoPadraoConstrucao?: string;
      tipoTerreno?: string;
    }];
  };
  socioDemografico?: {
    profissao?: string;
    rendaPresumida?: string;
  };
  // CNPJ
  firmografico?: {
    cnae?: [{
      cnae_codigo?: string;
      cnae_descricao?: string;
    }];
    codigoNaturezaJuridica?: string;
    descricaoNaturezaJuridica?: string;
    faixaFaturamento?: string;
    faixaFuncionario?: string;
    porte?: string;
    simples?: string;
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

  const { token, user, signOut } = useAuth()

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      if (!isLoading) {
        try {
          setIsLoading(true)
          setButtonIcon(<FaSpinner />)
          setButtonText('Consultando...')
          setIsErrored(false)

          const response = await api.post('/queries',
            { type: data.type.toLowerCase(), filter: data.search },
            { headers: {
              Authorization: `Bearer ${token}`
            } }
          )

          if (response.data.retorno === 'ERRO') throw new Error(response.data.msg)

          if (response.data.msg && response.data.msg.length) {
            setHasResults(true)
            setResults(response.data.msg)
          } else {
            throw new Error('Nenhum resultado encontrado')
          }

          setIsLoading(false)
          setButtonIcon(<FaSearch />)
          setButtonText('Consultar')
        } catch (error) {
          if (String(error).includes('400')) {
            setButtonText('API em manutenção')
          } else if (String(error).includes('401')) {
            setButtonText('Sem acesso')
          }

          setButtonIcon(<FaExclamationCircle />)

          setIsErrored(true)

          setTimeout(() => {
            setIsLoading(false)
            setButtonIcon(<FaSearch />)
            setButtonText('Consultar')

            setIsErrored(false)
          }, 4000)
        }
      }
    }, [isLoading, token]
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

          <h1 className="expireText">{
            new Date() < new Date(user.expireAt) ?
            `Acesso até ${new Date(user.expireAt).toLocaleString('pt-BR').replace(' ', ' às ')}`
            : 'Acesso expirado'
          }</h1>
        </Form>
        <p className="logoutButton" onClick={(e) => {
          e.preventDefault()
          signOut()
        }}><FaPowerOff size={18} /></p>

        {
          hasResults &&
          <SearchList>
            {
              results && results.length && results.map(result => (
                <Result key={result.pessoa?.cadastral?.CPF || result.empresa?.cadastral?.CNPJ}>
                  <div>
                    <strong>NOME</strong>
                    <p>
                      {
                        result.pessoa && result.pessoa.cadastral && result.pessoa.cadastral.CPF ?
                        `${result.pessoa.cadastral.nomePrimeiro} ${result.pessoa.cadastral.nomeMeio} ${result.pessoa.cadastral.nomeUltimo} ${result.pessoa.cadastral.nomeParentesco}`
                        : `${result.empresa.cadastral.razaoSocial}`
                      }
                    </p>
                    {/* <p>{result.pessoa.cadastral.nomePrimeiro} {result.pessoa.cadastral.nomeMeio} {result.pessoa.cadastral.nomeUltimo} {result.pessoa.cadastral.nomeParentesco}</p> */}
                  </div>

                  <div>
                    <strong>{ result.pessoa?.cadastral.CPF ? 'CPF' : 'CNPJ' }</strong>
                    <p>{ result.pessoa?.cadastral.CPF ? result.pessoa?.cadastral?.CPF : result.empresa?.cadastral?.CNPJ }</p>
                  </div>

                  <div>
                    <button onClick={() => {
                      setData(result.pessoa || result.empresa)
                      setIsModalVisible(true)
                    }}><FaPlus /> <p>Ver mais</p></button>
                  </div>
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
