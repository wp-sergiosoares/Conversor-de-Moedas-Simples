import { useState } from "react";
import "./App.css";

function App() {
  const [valor, setValor] = useState(0);
  const [deMoeda, setDeMoeda] = useState("eur");
  const [paraMoeda, setParaMoeda] = useState("dol");
  const [resultado, setResultado] = useState(0);
  const [erro, setErro] = useState(null);

  const obterTaxaConversao = (de, para) => {
    if (de === para) return 1;
    if (de === "eur" && para === "dol") return 1.16;
    if (de === "dol" && para === "eur") return 0.86;
    return 1; // padrão de fallback
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (deMoeda === paraMoeda) {
      setResultado(valor);
      return;
    }

    if (!valor || valor <= 0) {
      setErro("Insira um valor válido");
      return;
    }

    const taxa = obterTaxaConversao(deMoeda, paraMoeda);
    const resultadoC = valor * taxa;
    setResultado(resultadoC.toFixed(2));
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-gray-400 my-10 p-4">
        <h1 className="text-center text-2xl">Conversor de moedas</h1>
        <form action="" onSubmit={handleConvert} className="space-y-4">
          <div>
            <div className="grid gap-2">
              <label>Valor</label>
              <input
                type="number"
                className="bg-white p-2"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label>de:</label>
              <select
                name="demoeda"
                id=""
                value={deMoeda}
                onChange={(e) => setDeMoeda(e.target.value)}
              >
                <option value="eur">Euro</option>
                <option value="dol">Dolar</option>
              </select>
            </div>
            <div className="flex-1">
              <label>para:</label>
              <select
                name=""
                id=""
                value={paraMoeda}
                onChange={(e) => setParaMoeda(e.target.value)}
              >
                <option value="eur">Euro</option>
                <option value="dol">Dolar</option>
              </select>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 w-full p-2">Converter</button>
          </div>
        </form>

        {erro && erro}

        {resultado > 0 && (
          <div className="mt-4 text-center text-xl font-bold">
            {valor} {deMoeda.toUpperCase()} = {resultado}{" "}
            {paraMoeda.toUpperCase()}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
