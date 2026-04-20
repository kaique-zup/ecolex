# 🌳 EcoLex: O Resgate da Árvore

**EcoLex** é uma releitura moderna, educativa e ecológica do clássico jogo da forca. Desenvolvido para crianças de todas as idades (especialmente na faixa dos 10 anos), o jogo substitui a temática punitiva tradicional por uma mecânica de cuidado com o meio ambiente e aprendizado de idiomas.

---

## ✨ Diferenciais do Projeto

O EcoLex se destaca por três pilares principais:

1.  **Narrativa Ecológica:** Em vez de um boneco na forca, você visualiza uma árvore. A cada erro, ela perde folhas e flores, murchando até secar. O objetivo é salvar a vida da planta!
2.  **Aprendizado Bilíngue:** Jogue em Português com dicas em Inglês (ou vice-versa). Perfeito para expandir o vocabulário de forma lúdica.
3.  **Power-ups Estratégicos:** No início de cada rodada, você ganha um item especial sorteado (Chuva 💧, Sol ☀️ ou Adubo 🍃) para ajudar nos momentos difíceis.

---

## 🛠️ Tecnologias Sugeridas

Este projeto pode ser implementado utilizando:
* **Front-end:** [React.js](https://reactjs.org/) / [Vue.js](https://vuejs.org/) ou JavaScript Vanila.
* **Estilização:** Tailwind CSS ou CSS Modules (Foco em cores "Zen" e orgânicas).
* **Dados:** JSON customizado com +200 palavras bilíngues.
* **Ícones:** Lucide React ou Phosphor Icons.

---

## 🚀 Como Jogar

1.  **Escolha seu modo:** Selecione a categoria (Animais, Espaço, Escola, etc) e a combinação de idiomas.
2.  **Observe sua árvore:** Você tem 6 chances antes que a árvore murche completamente.
3.  **Use seu Power-up:** Cada palavra sorteia um item único. Use-o com sabedoria!
    * 💧 **Chuva:** Revela uma letra oculta.
    * ☀️ **Sol:** Protege você do seu próximo erro.
    * 🍃 **Adubo:** Fornece uma dica extra sobre a palavra.
4.  **Vença e Aprenda:** Ao acertar, a árvore floresce e você vê a tradução completa da palavra.

---

## 📂 Estrutura de Arquivos Principal

```text
src/
├── assets/          # Imagens e SVGs da árvore (estados 1 a 6)
├── components/      # Teclado, Forca (Árvore), Modal de Status
├── data/            # palavras.json (o banco de 200 palavras)
├── hooks/           # Lógica do jogo e gerenciamento de tentativas
└── styles/          # Definições de cores e temas
