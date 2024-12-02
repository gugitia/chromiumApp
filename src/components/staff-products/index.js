import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
import EditProduct from "../edit-products";
import AddProduct from "../add-products";

export default function ProductsStaff() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto a ser editado
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Controla a exibição do modal
  const [produtos, setProducts] = useState(null);

  // Abre o modal com o produto selecionado
  const handleEditClick = (produto) => {
    setSelectedProduct(produto);
    setIsEditing(true);
  };

  const handleDeleteClick = (produto) => {
    setSelectedProduct(produto);
    setIsDeleting(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/produtos/${selectedProduct._id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((produto) => produto._id !== selectedProduct._id)
      );
      setIsDeleting(false);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Não foi possível deletar o produto. Tente novamente.");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedProduct(null);
  };

  // Salva as alterações do produto
  const handleSaveChanges = (updatedProduct) => {
    const updatedProdutos = produtos.map((produto) =>
      produto._id === updatedProduct._id ? updatedProduct : produto
    );
    setProducts(updatedProdutos); // Atualiza a lista localmente
    setIsEditing(false); // Fecha o modal
    setSelectedProduct(null);
  };

  const handleSaveProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]); // Adiciona o novo produto à lista
    setIsAdding(false); // Fecha o modal
  };

  const handleAddingClick = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    api.get("produtos").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="products-staff-container">
      {isEditing && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onSave={handleSaveChanges}
          onCancel={handleCloseModal}
        />
      )}
      {isAdding && (
        <AddProduct
          onAdd={handleSaveProduct}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {isDeleting && (
        <div>
          <h2>
            Deseja apagar o produto <strong>{selectedProduct.produto}</strong>?
          </h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={handleConfirmDelete}>Sim</button>
            <button onClick={handleCancelDelete}>Não</button>
          </div>
        </div>
      )}

      {produtos ? (
        <table className="staff-table">
          <button
            className="add-product-button"
            onClick={() => handleAddingClick()}
          >
            <FiUpload />
          </button>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Imagem</th>
              <th>Tags</th>
              <th>Data de Criação</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto._id}>
                <td>{produto._id}</td>
                <td>{produto.produto}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.valor.toFixed(2)}</td>
                <td>
                  <img
                    src={produto.imagems}
                    alt={produto.produto}
                    width="100"
                  />
                </td>
                <td>
                  <p>Tags: {produto.tags.join(", ")}</p>
                </td>
                <td>{new Date(produto.createdAt).toLocaleDateString()}</td>
                <td>
                  <FiEdit
                    onClick={() => handleEditClick(produto)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <FiTrash2 onClick={() => handleDeleteClick(produto)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
