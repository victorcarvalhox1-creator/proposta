
import { GoogleGenAI } from "@google/genai";
import { PricingData, CalculationResult } from "../types";

export async function generateProposalJustification(data: PricingData, result: CalculationResult) {
  // Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) as per guidelines.
  // Initialize inside the function to avoid top-level side effects and ensure fresh config.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Atue como um consultor sênior especializado em concessionárias de veículos. 
    Gere uma justificativa profissional e persuasiva para uma proposta comercial de Assessoria Contábil, Fiscal e de DP com os seguintes dados:
    - Vendas Mensais: ${data.baseMonthlySales} carros
    - Filiais: ${data.numBranches}
    - Quantidade de CNPJ Matriz: ${data.numCNPJMatriz}
    - Possui Funcionários (Departamento Pessoal): ${data.hasDP ? 'Sim (Incluído na assessoria)' : 'Não (Assessoria apenas Contábil/Fiscal)'}
    - Localização: ${data.hasDifferentState ? 'Operações em múltiplos estados' : 'Operação local'}
    - Equipe Interna Necessária (Pré-requisito do Cliente): ${result.requiredStaff.fiscal} (Fiscal) ${data.hasDP ? `e ${result.requiredStaff.dp} (Departamento Pessoal)` : ''}
    - Valor Mensal Calculado: R$ ${result.totalMonthly.toLocaleString('pt-BR')}
    - Valor do Diagnóstico Inicial: R$ ${result.diagnosisFee.toLocaleString('pt-BR')}

    Pontos a considerar na justificativa:
    1. A importância do diagnóstico de vulnerabilidade inicial para mapear riscos específicos do setor automotivo.
    2. Explicar que a equipe interna requerida é dimensionada conforme o número de CNPJ Matriz (${data.numCNPJMatriz}) para garantir a integridade da operação e conformidade técnica.
    3. Justificar as variações de preço com base no volume de vendas, número de filiais, presença de funcionários (DP) e complexidade de jurisdições (Estados/Municípios).
    4. Ressaltar explicitamente que não está inclusa a parametrização dos processos do setor financeiro e comercial.
    5. Mencionar que custos de viagem e hospedagem são de responsabilidade do cliente.

    Escreva em um tom formal, consultivo e que transmita autoridade técnica. Mantenha o texto conciso (máximo 3 parágrafos).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Erro ao gerar justificativa.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Não foi possível gerar a justificativa automaticamente no momento. Verifique a chave de API.";
  }
}
