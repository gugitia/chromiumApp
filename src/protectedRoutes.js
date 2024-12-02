import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rotas com base em condições de autenticação.
 *
 * @param {React.ReactNode} children - O conteúdo a ser renderizado se autorizado.
 * @param {Function} isAuthorized - Função de validação que retorna `true` se o acesso for permitido.
 * @param {string} redirectTo - Caminho para redirecionar caso a validação falhe.
 */
function ProtectedRoute({ children, isAuthorized, redirectTo }) {
  // Verifica se a função de autorização permite o acesso
  if (!isAuthorized()) {
    return <Navigate to={redirectTo} />;
  }

  // Renderiza o conteúdo se autorizado
  return children;
}

export default ProtectedRoute;
