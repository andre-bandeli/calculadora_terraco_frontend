import React from 'react';

const ResultDisplay = ({ results, onGenerateReport }) => {
  if (!results) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-800">Resultados do Cálculo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-medium text-green-700">Espaçamento Vertical (EV)</h3>
          <p className="text-2xl font-bold text-green-800">{results.ev} metros</p>
          <p className="text-sm text-gray-600 mt-1">
            Diferença de nível entre terraços
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-700">Espaçamento Horizontal (EH)</h3>
          <p className="text-2xl font-bold text-blue-800">{results.eh} metros</p>
          <p className="text-sm text-gray-600 mt-1">
            Distância horizontal entre terraços
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Parâmetros Utilizados:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="font-medium">Declividade:</span> {results.declividade}%</li>
          <li><span className="font-medium">Tipo de Solo:</span> {results.soil_type} (Kt={results.kt})</li>
          <li><span className="font-medium">Uso da Terra:</span> {results.land_use} (U={results.u})</li>
          <li><span className="font-medium">Preparo do Solo:</span> {results.soil_preparation} (M={results.m})</li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Fórmulas Aplicadas:</h3>
        <div className="font-mono bg-white p-3 rounded text-sm">
          <p>EV = 0,4518 × Kt × (D<sup>0,58</sup>) × [(U + M) / 2] = {results.ev}m</p>
          <p>EH = EV × (100 / D) = {results.eh}m</p>
        </div>
      </div>
      
    </div>
  );
};

export default ResultDisplay;