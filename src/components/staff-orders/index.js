import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";

export default function OrderStaff() {
  const [ordens, setOrdens] = useState(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Função para buscar os pedidos
  useEffect(() => {
    api.get("ordem").then((response) => {
      setOrdens(response.data);
    });
  }, []);

  // Função para selecionar e exibir mais detalhes de um pedido
  const handleSelecionarPedido = (ordem) => {
    setPedidoSelecionado(ordem);
  };

  // Função para fechar os detalhes do pedido
  const handleFecharDetalhes = () => {
    setPedidoSelecionado(null);
  };

  return (
    <div className="order-staff-container">
      {ordens ? (
        <>
          <table className="staff-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Comprador</th>
                <th>Cpf Comprador</th>
                <th>Local</th>
                <th>Valor</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ordens.map((ordem) => (
                <tr key={ordem._id}>
                  <td>{ordem._id}</td>
                  <td>{ordem.usuarioId}</td>
                  <td>{ordem.cpf}</td>
                  <td>{ordem.endereco.rua}</td>
                  <td>R$ {parseFloat(ordem.valor).toFixed(2)}</td>
                  <td>{new Date(ordem.dataCompra).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleSelecionarPedido(ordem)}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Caixa de Detalhes do Pedido */}
          {pedidoSelecionado && (
            <div className="detalhes-pedido-container">
              <div className="detalhes-pedido">
                <h3>Detalhes do Pedido {pedidoSelecionado._id}</h3>
                <p onClick={handleFecharDetalhes}>Voltar</p>
                <p>
                  <strong>Comprador:</strong> {pedidoSelecionado.usuarioId}
                </p>
                <p>
                  <strong>Valor Total:</strong> R${" "}
                  {parseFloat(pedidoSelecionado.valor).toFixed(2)}
                </p>
                <p>
                  <strong>Data de Compra:</strong>{" "}
                  {new Date(pedidoSelecionado.dataCompra).toLocaleDateString()}
                </p>
                <p>
                  <strong>Data de Entrega:</strong>{" "}
                  {new Date(pedidoSelecionado.dataEntrega).toLocaleDateString()}
                </p>
                <p>
                  <strong>Entregue:</strong>{" "}
                  {pedidoSelecionado.entregue ? "Sim" : "Não"}
                </p>

                <h4>Endereço</h4>
                <p>
                  <strong>Rua:</strong> {pedidoSelecionado.endereco.rua}
                </p>
                <p>
                  <strong>Número:</strong> {pedidoSelecionado.endereco.numero}
                </p>
                <p>
                  <strong>Cidade:</strong> {pedidoSelecionado.endereco.cidade}
                </p>
                <p>
                  <strong>Estado:</strong> {pedidoSelecionado.endereco.estado}
                </p>
                <p>
                  <strong>CEP:</strong> {pedidoSelecionado.endereco.cep}
                </p>

                <h4>Pagamento:</h4>
                <p>
                  <strong>Método de Pagamento:</strong>{" "}
                  {pedidoSelecionado.pagamento.metodo}
                </p>
                {pedidoSelecionado.pagamento.metodo === "cartao" && (
                  <>
                    <p>
                      <strong>Tipo de Cartão:</strong>{" "}
                      {pedidoSelecionado.pagamento.detalhes.tipoCartao}
                    </p>
                    <p>
                      <strong>Número do Cartão:</strong>{" "}
                      {pedidoSelecionado.pagamento.detalhes.numeroCartao.replace(
                        /\d(?=\d{4})/g,
                        "*"
                      )}{" "}
                      {/* Mostrando apenas os últimos 4 dígitos */}
                    </p>
                    <p>
                      <strong>Validade:</strong>{" "}
                      {pedidoSelecionado.pagamento.detalhes.validade}
                    </p>
                  </>
                )}

                <h4>Produtos:</h4>
                <ul>
                  {pedidoSelecionado.produtosId
                    .split(",")
                    .map((produtoId, index) => (
                      <li key={index}>Produto ID: {produtoId}</li>
                    ))}
                </ul>

                <button onClick={handleFecharDetalhes}>Fechar</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
