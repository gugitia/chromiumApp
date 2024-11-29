import React, { useState } from "react";
import api from "../../services/api"; // Importa a API configurada

const AddProduct = ({ onAdd, onCancel }) => {
  const [formValues, setFormValues] = useState({
    produto: "",
    tags: "",
    descricao: "",
    valor: "",
    imagems: "",
    tipo: "",
    conteudo: "",
  });

  const [isSaving, setIsSaving] = useState(false); // Indica se está salvando
  const [error, setError] = useState(null); // Exibe erros, se houver

  // Atualiza os valores no estado local conforme o usuário edita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };

      if (name === "tipo" && value === "especial") {
        updatedValues.tags = "gacha";
      } else if (name === "tipo") {
        updatedValues.tags = "";
      }

      return updatedValues;
    });
  };

  // Adiciona o novo produto via API
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    const newProduct = {
      ...formValues,
      tags: formValues.tags.split(",").map((tag) => tag.trim()),
      valor: parseFloat(formValues.valor),
    };

    try {
      // Chamada POST para adicionar o produto
      const response = await api.post("/produtos", newProduct);
      console.log(response.data);
      onAdd(response.data); // Notifica o componente pai com o novo produto
    } catch (err) {
      console.error("Erro ao adicionar o produto:", err);
      setError("Não foi possível adicionar o produto. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <h2>Adicionar Novo Produto</h2>
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
        <label>
          Tipo:
          <div>
            <label>
              <input
                type="radio"
                name="tipo"
                value="normal"
                checked={formValues.tipo === "normal"}
                onChange={handleChange}
              />
              Normal
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="tipo"
                value="especial"
                checked={formValues.tipo === "especial"}
                onChange={handleChange}
              />
              Especial
            </label>
          </div>
        </label>
        {formValues.tipo === "especial" && (
          <label>
            Conteudo:
            <input
              type="text"
              name="conteudo"
              value={formValues.conteudo}
              onChange={handleChange}
              placeholder="Insira o conteudo"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
        )}
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
            {isSaving ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
