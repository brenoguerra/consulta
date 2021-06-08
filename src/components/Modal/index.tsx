import React, { useState, useCallback, HtmlHTMLAttributes } from 'react'

import { ImProfile } from 'react-icons/im'
import { BiLink } from 'react-icons/bi'
import { FaAddressBook } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'

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
            {
              data.cadastral?.CPF ?
              (
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
              )
              :
              (
                <>
                  <p>Razão Social: <strong>{data.cadastral?.razaoSocial}</strong></p>
                  <p>CNPJ: <strong>{data.cadastral?.CNPJ}</strong></p>
                  <p>Data de Abertura: <strong>{data.cadastral?.dataAbertura}</strong></p>
                  <p>Status Receita Federal: <strong>{data.cadastral?.statusReceitaFederal}</strong></p>
                  <p>Situação Cadastral: <strong>{data.cadastral?.situacaoCadastral}</strong></p>
                  <p>Inscrição Estadual: <strong>{data.cadastral?.inscricaoEstadual}</strong></p>
                  <p>Matriz: <strong>{data.cadastral?.matriz}</strong></p>
                  <p>Motivo Situacao Cadastral: <strong>{data.cadastral?.motivoSituacaoCadastral}</strong></p>
                  <p>Nome Fantasia: <strong>{data.cadastral?.nomeFantasia}</strong></p>
                  <p>Situação Cadastral: <strong>{data.cadastral?.situacaoCadastral}</strong></p>
                  <p>Situação Especial: <strong>{data.cadastral?.situacaoEspecial}</strong></p>
                  <p>Faturamento: <strong>{data.firmografico?.faixaFaturamento}</strong></p>
                  <p>Funcionários: <strong>{data.firmografico?.faixaFuncionario}</strong></p>
                  <p>Porte: <strong>{data.firmografico?.porte}</strong></p>
                  <p>Simples: <strong>{data.firmografico?.simples}</strong></p>

                  <br />
                  <h2>CNAE</h2>
                  {
                    data.firmografico?.cnae && data.firmografico?.cnae.map(cnae => (
                      <>
                        <br />
                        <p>Código: <strong>{cnae.cnae_codigo}</strong></p>
                        <p>Descrição: <strong>{cnae.cnae_descricao}</strong></p>
                      </>
                    ))
                  }
                </>
              )
            }
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
                    <p>Nome: <strong>{parentesco.nomeCompleto}</strong></p>
                    <p>CPF: <strong>{parentesco.cpf}</strong></p>
                    <p>Grau de parentesco: <strong>{parentesco.grauDeParentesco}</strong></p>
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
              <br />
              <h2>Imóveis</h2>
              {
                data.patrimonio?.imovel && data.patrimonio?.imovel.map(imovel => (
                  <>
                    <br />
                    <p>Contribuente: <strong>{imovel.contribuente}</strong></p>
                    <p>Ano exercicio: <strong>{imovel.anoExercicio}</strong></p>
                    <p>Tipo logradouro: <strong>{imovel.tipoLogradouro}</strong></p>
                    <p>Numero: <strong>{imovel.logradouro}</strong></p>
                    <p>Complemento: <strong>{imovel.complemento}</strong></p>
                    <p>Bairo: <strong>{imovel.bairro}</strong></p>
                    <p>Cidade: <strong>{imovel.cidade}</strong></p>
                    <p>Estado: <strong>{imovel.uf}</strong></p>
                    <p>CEP: <strong>{imovel.cep}</strong></p>
                    <p>Area do terreno: <strong>{imovel.areaTerreno}</strong></p>
                    <p>Area construida: <strong>{imovel.areaConstruida}</strong></p>
                    <p>Valor m² terreno: <strong>{imovel.valorMQuadradoTerreno}</strong></p>
                    <p>Valor m² construção: <strong>{imovel.valorMQuadradoConstrucao}</strong></p>
                    <p>Pavimentos: <strong>{imovel.quantidadePavimentos}</strong></p>
                    <p>Tipo de uso: <strong>{imovel.tipoUsoImovel}</strong></p>
                    <p>Tipo de construção: <strong>{imovel.tipoPadraoConstrucao}</strong></p>
                    <p>Tipo de terreno: <strong>{imovel.tipoTerreno}</strong></p>
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
