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

    const taxas = {
      eur: { dol: 1.16, brl: 5.4, gbp: 0.85, jpy: 156.3, cad: 1.5 },
      dol: { eur: 0.86, brl: 4.65, gbp: 0.73, jpy: 134.5, cad: 1.29 },
      brl: { eur: 0.18, dol: 0.22, gbp: 0.16, jpy: 28.9, cad: 0.28 },
      gbp: { eur: 1.17, dol: 1.36, brl: 6.0, jpy: 183.2, cad: 1.75 },
      jpy: { eur: 0.0064, dol: 0.0074, brl: 0.034, gbp: 0.0055, cad: 0.0095 },
      cad: { eur: 0.67, dol: 0.78, brl: 3.5, gbp: 0.57, jpy: 105.2 },
    };

    return taxas[de]?.[para] || 1;
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (deMoeda === paraMoeda) {
      setResultado(valor);
      return;
    }

    if (!valor || valor <= 0) {
      setErro("Insira um valor válido");
      setResultado(0);
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
                onChange={(e) => {
                  setValor(Number(e.target.value));
                  setErro(null);
                }}
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
                <option value="dol">Dólar</option>
                <option value="brl">Real</option>
                <option value="gbp">Libra</option>
                <option value="jpy">Iene</option>
                <option value="cad">Dólar Canadense</option>
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
                <option value="dol">Dólar</option>
                <option value="brl">Real</option>
                <option value="gbp">Libra</option>
                <option value="jpy">Iene</option>
                <option value="cad">Dólar Canadense</option>
              </select>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 w-full p-2">Converter</button>
            <button
              type="button"
              onClick={() => {
                const temp = deMoeda;
                setDeMoeda(paraMoeda);
                setParaMoeda(temp);
                setErro(null);
                setResultado(null);
              }}
              className="text-sm underline text-center w-full my-2"
            >
              Inverter moedas
            </button>
          </div>
        </form>

        {erro && erro}

        {resultado !== null && (
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
