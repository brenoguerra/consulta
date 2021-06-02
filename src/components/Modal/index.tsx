import React, { HtmlHTMLAttributes } from 'react'

import { ImProfile } from 'react-icons/im'
import { BiBookmarks, BiLink } from 'react-icons/bi'
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
  };
}

const Modal: React.FC<ModalProps> = ({
  id = 'modal',
  children,
  onClose = () => {},
  data
}) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    const click = e.target as HTMLButtonElement
    if (click.id === id) onClose()
  }

  return (
    <Container id={id} onClick={handleOutsideClick}>
      <Content>
        <button onClick={onClose} />

        <SelectBar>
          <SelectButton selected={true}><ImProfile /> Cadastral</SelectButton>
          <SelectButton><BiBookmarks /> Beneficios</SelectButton>
          <SelectButton><FaAddressBook /> Contatos</SelectButton>
          <SelectButton><BiLink /> Vínculos</SelectButton>
          <SelectButton><GiCash /> Patrimônio</SelectButton>
          <SelectButton><RiCommunityLine /> Sociodemográfico</SelectButton>
        </SelectBar>

        <TextContent>
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
        <p>Nome da mãe: <strong>{data.cadastral?.maeNomePrimeiro} {data.cadastral?.maeNomeMeio} {data.cadastral?.maeNomeUltimo} {data.cadastral?.maeNomeParentesco}</strong></p>
        <p>CPF da mãe: <strong>{data.cadastral?.maeCPF}</strong></p>
        <p>Escolaridade: <strong>{data.cadastral?.escolaridade}</strong></p>
        <p>Menor de idade: <strong>{data.cadastral?.menorDeIdade !== '0' ? 'SIM' : 'NÃO'}</strong></p>
        <p>Nacionalidade: <strong>{data.cadastral?.nacionalidade}</strong></p>
        <p>Óbito: <strong>{data.cadastral?.obito !== '0' ? 'SIM' : 'NÃO'}</strong></p>
        </TextContent>
      </Content>
    </Container>
  )
}

export default Modal
