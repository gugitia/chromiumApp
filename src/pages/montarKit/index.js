import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Serviço de API
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./styles.css"; // Estilos

const Questionario = () => {
  const [etapaAtual, setEtapaAtual] = useState(0); // Etapa do questionário
  const [respostas, setRespostas] = useState([]);
  const [pedido, setPedido] = useState([]); // Respostas por etapa
  const [produtos, setProdutos] = useState([]); // Produtos obtidos da API
  const { adicionarAoCarrinho, limparCarrinho } = useCart();

  const etapas = 7; // Número total de etapas
  const alturaInicial = 800; // Altura inicial do quadro
  const incrementoAltura = 100; // Altura adicional por etapa

  const imagensEtapas = [
    "https://via.placeholder.com/150/0000FF", // Imagem para etapa 1
    "https://via.placeholder.com/150/FF0000", // Imagem para etapa 2
    "https://via.placeholder.com/150/00FF00", // Imagem para etapa 3
    "https://via.placeholder.com/150/FFFF00", // Imagem para etapa 4
    "https://via.placeholder.com/150/FF00FF", // Imagem para etapa 5
    "https://via.placeholder.com/150/00FFFF", // Imagem para etapa 6
  ];

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos"); // Chama o endpoint de produtos
        const produtosComQuantidade = response.data.map((produto) => ({
          ...produto,
          quantidade: 0, // Inicializa a quantidade com 0
        }));
        setProdutos(produtosComQuantidade); // Atualiza a lista de produtos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos(); // Carrega os produtos ao iniciar
  }, []);

  const adicionarResposta = (produto) => {
    const novasRespostas = [...respostas];
    if (!novasRespostas[etapaAtual]) {
      novasRespostas[etapaAtual] = [];
    }

    const produtoIndex = novasRespostas[etapaAtual].findIndex(
      (item) => item._id === produto._id
    );

    if (produtoIndex === -1) {
      novasRespostas[etapaAtual].push({ ...produto, quantidade: 1 });
    } else {
      novasRespostas[etapaAtual][produtoIndex].quantidade += 1;
    }

    adicionarAoCarrinho(produto);
    setRespostas(novasRespostas);
  };

  const proximaEtapa = () => {
    if (etapaAtual < etapas - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const refazerQuestionario = () => {
    setEtapaAtual(0);
    setRespostas([]); // Reseta as respostas
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => ({ ...produto, quantidade: 0 }))
    );
    limparCarrinho();
  };

  const etapaTitle = (etapaAtual) => {
    switch (etapaAtual) {
      case 1:
        return "Escolha seu mapa";
      case 2:
        return "Escolha seus personagens";
      case 3:
        return "Escolha os objetos de cenario";
      case 4:
        return "Escolha seus inimigos";
      case 5:
        return "Escolha seus vilões";
      default:
        return "fim";
    }
  };

  return (
    <div
      className="quadro"
      style={{
        height: `${alturaInicial + incrementoAltura * etapaAtual}px`,
      }}
    >
      <div className="conteudo">
        <div className="respostas-selecionadas">
          {respostas.map((resposta, etapaIndex) => (
            <div key={etapaIndex} className="resumo-etapa">
              <h4>Etapa {etapaIndex + 1}</h4>
              <img
                src={imagensEtapas[etapaIndex]}
                alt={`Imagem da Etapa ${etapaIndex + 1}`}
                className="imagem-etapa"
              />
              <ul>
                {resposta.map((produto, index) => (
                  <li key={index} className="item-resposta">
                    <img
                      src={produto.imagems}
                      alt={"imagem do produto"}
                      className="imagem-produto-selecionado"
                    ></img>
                    - Valor: R${produto.valor}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {etapaAtual < etapas - 1 ? (
          <>
            <h3>{etapaTitle(etapaAtual + 1)}</h3>
            <button onClick={proximaEtapa} className="botao-proximo">
              Próxima Etapa
            </button>
            <div className="opcoes">
              {produtos.map((produto) => (
                <div key={produto._id} className="produto-card">
                  <img
                    src={produto.imagems}
                    alt={produto.produto}
                    className="produto-imagem"
                  />
                  <h4>{produto.produto}</h4>
                  <p>Valor: R${produto.valor}</p>
                  <button
                    onClick={() => adicionarResposta(produto)}
                    className="botao"
                  >
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h3>Resumo Final</h3>
            {respostas.map((resposta, etapaIndex) => (
              <div key={etapaIndex} className="resumo-final">
                <h4>Etapa {etapaIndex + 1}</h4>
                <img
                  src={imagensEtapas[etapaIndex]}
                  alt={`Imagem da Etapa ${etapaIndex + 1}`}
                  className="imagem-etapa"
                />
                <ul>
                  {resposta.map((produto, index) => (
                    <li key={index}>
                      {produto.produto} (Quantidade: {produto.quantidade}) - R${" "}
                      {produto.valor * produto.quantidade}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={refazerQuestionario} className="botao-refazer">
              Refazer Questionário
            </button>
            <button className="shop-button">
              <Link to="/comprar">Comprar</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionario;
