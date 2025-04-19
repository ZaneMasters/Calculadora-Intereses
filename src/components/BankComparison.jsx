export default function BankComparison() {
    const bancos = [
      { nombre: "Nu", tasa: 13 },
      { nombre: "Ualá", tasa: 12 },
      { nombre: "Lulo Bank", tasa: 11 },
      { nombre: "Nequi", tasa: 10.5 },
    ];
  
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Comparativa de Bancos</h2>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="py-2">Banco</th>
              <th className="py-2">Tasa Anual (%)</th>
            </tr>
          </thead>
          <tbody>
            {bancos.map((banco) => (
              <tr key={banco.nombre} className="border-t">
                <td className="py-2">{banco.nombre}</td>
                <td className="py-2">{banco.tasa}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  