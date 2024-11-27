import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
//import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./styles.css";

export default function ConfirmacaoCompra({ setIsCartVisible, history }) {
  // Estados para informações de entrega e pagamento
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const [pagamento, setPagamento] = useState({
    metodo: "",
    detalhes: "",
  });

  /*useEffect(() => {
    // Oculta o carrinho ao abrir a página de confirmação de compra
    setIsCartVisible(false);
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [setIsCartVisible, isAuthenticated, history]); */

  const { items, removerDoCarrinho, limparCarrinho } = useCart();

  //const { usuario, isAuthenticated } = useAuth();

  const handleFinalizarCompra = async () => {
    const produtosId = items.map((item) => item._id).join(",");
    const valorTotal = items
      .reduce((acc, item) => acc + item.valor, 0)
      .toFixed(2);

    try {
      const response = await api.post("/ordem", {
        produtosId,
        usuarioId: 123,
        valor: valorTotal,
        entregue: 0,
        endereco, // Adicionando as informações de endereço
        pagamento, // Adicionando as informações de pagamento
      });

      if (response.status === 201) {
        alert("Compra realizada com sucesso!");
        limparCarrinho();
      }
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Ocorreu um erro ao finalizar a compra. Tente novamente.");
    }
  };

  return (
    <div className="confirmacao-compra-container">
      <h2>Confirme sua compra</h2>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <table className="tabela-compra">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.produto}</td>
                <td>1 {/* Ajustar para quantidade se houver */}</td>
                <td>
                  {item.valor.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {(item.valor * 1).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  <button onClick={() => removerDoCarrinho(item)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Se houver itens no carrinho, exibe o formulário de endereço e pagamento */}
      {items.length > 0 && (
        <div>
          <div>
            <label>
              Rua:
              <input
                type="text"
                value={endereco.rua}
                onChange={(e) =>
                  setEndereco({ ...endereco, rua: e.target.value })
                }
                required
              />
            </label>
          </div>
          <div>
            <label>
              Número:
              <input
                type="text"
                value={endereco.numero}
                onChange={(e) =>
                  setEndereco({ ...endereco, numero: e.target.value })
                }
                required
              />
            </label>
          </div>
          <div>
            <label>
              Bairro:
              <input
                type="text"
                value={endereco.bairro}
                onChange={(e) =>
                  setEndereco({ ...endereco, bairro: e.target.value })
                }
                required
              />
            </label>
          </div>
          <div>
            <label>
              Cidade:
              <input
                type="text"
                value={endereco.cidade}
                onChange={(e) =>
                  setEndereco({ ...endereco, cidade: e.target.value })
                }
                required
              />
            </label>
          </div>
          <div>
            <label>
              Estado:
              <input
                type="text"
                value={endereco.estado}
                onChange={(e) =>
                  setEndereco({ ...endereco, estado: e.target.value })
                }
                required
              />
            </label>
          </div>
          <div>
            <label>
              CEP:
              <input
                type="text"
                value={endereco.cep}
                onChange={(e) =>
                  setEndereco({ ...endereco, cep: e.target.value })
                }
                required
              />
            </label>
          </div>

          <div>
            <label>
              Método de Pagamento:
              <select
                value={pagamento.metodo}
                onChange={(e) =>
                  setPagamento({ ...pagamento, metodo: e.target.value })
                }
                required
              >
                <option value="">Selecione</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="boleto">Boleto</option>
                <option value="paypal">PayPal</option>
              </select>
            </label>
          </div>
          {pagamento.metodo === "cartao" && (
            <div>
              <label>
                Detalhes do Cartão:
                <input
                  type="text"
                  value={pagamento.detalhes}
                  onChange={(e) =>
                    setPagamento({ ...pagamento, detalhes: e.target.value })
                  }
                  placeholder="Número do Cartão"
                  required
                />
              </label>
              <label>
                Data de Validade:
                <input
                  type="text"
                  value={pagamento.detalhes.validade}
                  onChange={(e) =>
                    setPagamento({
                      ...pagamento,
                      detalhes: {
                        ...pagamento.detalhes,
                        validade: e.target.value,
                      },
                    })
                  }
                  placeholder="MM/AA"
                  required
                />
              </label>

              <label>
                Código de Segurança (CVV):
                <input
                  type="text"
                  value={pagamento.detalhes.cvv}
                  onChange={(e) =>
                    setPagamento({
                      ...pagamento,
                      detalhes: { ...pagamento.detalhes, cvv: e.target.value },
                    })
                  }
                  placeholder="CVV"
                  required
                />
              </label>

              <label>
                Nome do Titular:
                <input
                  type="text"
                  value={pagamento.detalhes.nomeTitular}
                  onChange={(e) =>
                    setPagamento({
                      ...pagamento,
                      detalhes: {
                        ...pagamento.detalhes,
                        nomeTitular: e.target.value,
                      },
                    })
                  }
                  placeholder="Nome do Titular"
                  required
                />
              </label>
            </div>
          )}

          <div className="confirmacao-total">
            <p>
              Total:{" "}
              {items
                .reduce((acc, item) => acc + item.valor, 0)
                .toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
            </p>
            <button
              className="finalizar-compra-button"
              onClick={handleFinalizarCompra}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
