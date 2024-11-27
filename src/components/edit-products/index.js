import React, { useState } from "react";
import api from "../../services/api"; // Importa a API configurada

const EditProduct = ({ product, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({
    produto: product.produto,
    tags: product.tags.join(", "),
    descricao: product.descricao,
    valor: product.valor,
    imagems: product.imagems,
  });

  const [isSaving, setIsSaving] = useState(false); // Indica se está salvando
  const [error, setError] = useState(null); // Exibe erros, se houver

  // Atualiza os valores no estado local conforme o usuário edita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Salva as alterações e atualiza na API
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    const updatedProduct = {
      ...formValues,
      tags: formValues.tags.split(",").map((tag) => tag.trim()),
      valor: parseFloat(formValues.valor),
    };

    try {
      // Chamada PUT para atualizar o produto
      const response = await api.put(
        `/produtos/${product._id}`,
        updatedProduct
      );
      onSave(response.data); // Passa o produto atualizado para o componente pai
    } catch (err) {
      console.error("Erro ao salvar o produto:", err);
      setError("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <h2>Editar Produto</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <label>
          Produto:
          <input
            type="text"
            name="produto"
            value={formValues.produto}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Tags (separadas por vírgula):
          <input
            type="text"
            name="tags"
            value={formValues.tags}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={formValues.valor}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Imagem (URL):
          <input
            type="text"
            name="imagems"
            value={formValues.imagems}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{ background: "#ccc" }}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{ background: "#4caf50", color: "white" }}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
