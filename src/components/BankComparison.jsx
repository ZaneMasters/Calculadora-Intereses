import bancosData from "../utils/bankOptions.json"; // Ruta relativa al archivo .json

export default function BankComparison() {
  const bancos = Object.values(bancosData);

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Comparativa de Bancos</h2>
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th className="py-2">Banco</th>
            <th className="py-2">Tasa Anual (%)</th>
            <th className="py-2">Capitalización</th>
          </tr>
        </thead>
        <tbody>
          {bancos.map((banco) => (
            <tr key={banco.nombre} className="border-t">
              <td className="py-2">{banco.nombre}</td>
              <td className="py-2">{(banco.tasaEA * 100).toFixed(2)}%</td>
              <td className="py-2 capitalize">{banco.capitalizacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
