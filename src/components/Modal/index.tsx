import React, { useState, useCallback, HtmlHTMLAttributes } from 'react'

import { ImProfile } from 'react-icons/im'
import { BiLink } from 'react-icons/bi'
import { FaAddressBook } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'
import { RiCommunityLine } from 'react-icons/ri'

import { Container, Content, SelectBar, SelectButton, TextContent } from './styles'

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onClose(): void;
  data: {
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
      parentesco?: [object];
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
      imovel?: [object];
    };
    socioDemografico?: {
      profissao?: string;
      rendaPresumida?: string;
    };
  };
}

const Modal: React.FC<ModalProps> = ({
  id = 'modal',
  children,
  onClose = () => {},
  data
}) => {
  const [selected, setSelected] = useState('cadastral')

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const click = e.target as HTMLButtonElement
    if (click.id === id) onClose()
  }, [id, onClose])

  return (
    <Container id={id} onClick={handleOutsideClick}>
      <Content>
        <button onClick={onClose} />

        <SelectBar>
          <SelectButton
            selected={selected === 'cadastral'}
            onClick={() => setSelected('cadastral')}
          >
            <ImProfile /> Cadastral
          </SelectButton>

          <SelectButton
            onClick={() => setSelected('contatos')}
            selected={selected === 'contatos'}
          >
            <FaAddressBook /> Contatos
          </SelectButton>

          <SelectButton
            onClick={() => setSelected('vinculos')}
            selected={selected === 'vinculos'}
          >
            <BiLink /> Vínculos
          </SelectButton>

          <SelectButton
            onClick={() => setSelected('patrimonio')}
            selected={selected === 'patrimonio'}
          >
            <GiCash /> Patrimônio
          </SelectButton>
        </SelectBar>

        <TextContent>
          {
            selected === 'cadastral' &&
            <>
              <p>Nome: <strong>{data.cadastral?.nomePrimeiro} {data.cadastral?.nomeMeio} {data.cadastral?.nomeUltimo} {data.cadastral?.nomeParentesco}</strong></p>
              <p>CPF: <strong>{data.cadastral?.CPF}</strong></p>
              <p>
                RG:
                <strong>{data.cadastral?.rgNumero}</strong>

                Orgão Emissor:
                <strong>{data.cadastral?.rgOrgaoEmissor}</strong>

                UF:
                <strong>{data.cadastral?.rgUf}</strong>
              </p>
              <p>Data de atualização: <strong>{data.cadastral?.dataAtualizacaoStatusReceitaFederal}</strong></p>
              <p>Status Receita Federal: <strong>{data.cadastral?.statusReceitaFederal}</strong></p>
              <p>Nascimento: <strong>{data.cadastral?.dataNascimento}</strong></p>
              <p>Estado cívil: <strong>{data.cadastral?.estadoCivil}</strong></p>
              <p>CNS: <strong>{data.cadastral?.cns}</strong></p>
              <p>Titulo eleitoral: <strong>{data.cadastral?.tituloEleitoral}</strong></p>
              <p>Sexo: <strong>{data.cadastral?.sexo}</strong></p>
              <p>Conjuge: <strong>{data.vinculo?.conjuge?.nomePrimeiro} {data.vinculo?.conjuge?.nomeMeio} {data.vinculo?.conjuge?.nomeUltimo} {data.vinculo?.conjuge?.parentesco}</strong></p>
              <p>Nome da mãe: <strong>{data.cadastral?.maeNomePrimeiro} {data.cadastral?.maeNomeMeio} {data.cadastral?.maeNomeUltimo} {data.cadastral?.maeNomeParentesco}</strong></p>
              <p>CPF da mãe: <strong>{data.cadastral?.maeCPF}</strong></p>
              <p>Escolaridade: <strong>{data.cadastral?.escolaridade}</strong></p>
              <p>Menor de idade: <strong>{data.cadastral?.menorDeIdade !== '0' ? 'SIM' : 'NÃO'}</strong></p>
              <p>Nacionalidade: <strong>{data.cadastral?.nacionalidade}</strong></p>
              <p>Óbito: <strong>{data.cadastral?.obito !== '0' ? 'SIM' : 'NÃO'}</strong></p>
              <p>Bolsa Família: <strong>{data.beneficiarioProgramaSocial?.bolsaFamilia}</strong></p>
              <p>Profissão: <strong>{data.socioDemografico?.profissao}</strong></p>
              <p>Renda presumida: <strong>{data.socioDemografico?.rendaPresumida}</strong></p>
            </>
          }
          {
            selected === 'contatos' &&
            <>
              <h2>Endereços</h2>
              {
                data.contato?.endereco && data.contato?.endereco.map(endereco => (
                  <>
                    <br />
                    <p>Tipo logradouro: <strong>{endereco.tipoLogradouro}</strong></p>
                    <p>Logradouro: <strong>{endereco.logradouro}</strong></p>
                    <p>Numero: <strong>{endereco.numero}</strong></p>
                    <p>Complemento: <strong>{endereco.complemento}</strong></p>
                    <p>Bairro: <strong>{endereco.bairro}</strong></p>
                    <p>Cidade: <strong>{endereco.cidade}</strong></p>
                    <p>Estado: <strong>{endereco.uf}</strong></p>
                    <p>CEP: <strong>{endereco.cep}</strong></p>
                  </>
                ))
              }
              <br />
              <h2>Emails</h2>
              <br />
              {
                data.contato?.email && data.contato?.email.map(email => (
                  <>
                    <p>E-mail: <strong>{email.email}</strong></p>
                  </>
                ))
              }
              <br />
              <h2>Telefones</h2>
              {
                data.contato?.telefone && data.contato?.telefone.map(telefone => (
                  <>
                    <br />
                    <p>Número: <strong>({telefone.ddd}) {telefone.numero}</strong></p>
                    <p>Operadora: <strong>{telefone.operadora}</strong></p>
                    <p>Procon: <strong>{telefone.procon !== '0' ? 'SIM' : 'NÃO'}</strong></p>
                    <p>Whatsapp: <strong>{telefone.whatsapp}</strong></p>
                    <p>Tipo: <strong>{telefone.tipoTelefone}</strong></p>
                  </>
                ))
              }
            </>
          }
          {
            selected === 'vinculos' &&
            <>
              <h2>Parentesco</h2>
              {
                data.vinculo?.parentesco && data.vinculo?.parentesco.map(parentesco => (
                  <>
                    <br />
                    <p>Parentesco: <strong>{parentesco}</strong></p>
                  </>
                ))
              }
              <br />
              <h2>Vizinhos</h2>
              {
                data.vinculo?.vizinho && data.vinculo?.vizinho.map(vizinho => (
                  <>
                    <br />
                    <p>CPF: <strong>{vizinho.cpf}</strong></p>
                    <p>Nome: <strong>{vizinho.nomePrimeiro} {vizinho.nomeMeio} {vizinho.nomeUltimo} {vizinho.nomeParentesco}</strong></p>
                  </>
                ))
              }
              <br />
              <h2>Empregos</h2>
              {
                data.vinculo?.empregador && data.vinculo?.empregador.map(empregador => (
                  <>
                    <br />
                    <p>CNPJ: <strong>{empregador.cnpj}</strong></p>
                    <p>Razao social: <strong>{empregador.razaoSocial}</strong></p>
                    <p>Data de admissão: <strong>{empregador.dataAdmissao}</strong></p>
                  </>
                ))
              }
            </>
          }
          {
            selected === 'patrimonio' &&
            <>
              <h2>Veículos</h2>
              {
                data.patrimonio?.veiculo && data.patrimonio?.veiculo.map(veiculo => (
                  <>
                    <br />
                    <p>Marca: <strong>{veiculo.marca}</strong></p>
                    <p>Modelo: <strong>{veiculo.modelo}</strong></p>
                    <p>Ano: <strong>{veiculo.ano}</strong></p>
                    <p>Categoria: <strong>{veiculo.categoria}</strong></p>
                    <p>Sub categoria: <strong>{veiculo.subCategoria}</strong></p>
                    <p>Classificacao: <strong>{veiculo.classificacao}</strong></p>
                  </>
                ))
              }
            </>
          }
        </TextContent>
      </Content>
    </Container>
  )
}

export default Modal
